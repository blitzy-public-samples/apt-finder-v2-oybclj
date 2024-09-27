import { ZillowService } from '../services/zillow.service';
import { logger } from '../utils/logger';
import { ApartmentListing } from '../interfaces/apartment.interface';
import { ListingRepository } from '../repositories/listing.repository';
import cron from 'node-cron';

const UPDATE_INTERVAL = process.env.LISTING_UPDATE_INTERVAL || '0 */6 * * *';

/**
 * Fetches new apartment listings from Zillow and updates the database
 */
async function updateListings(): Promise<void> {
  try {
    logger.info('Starting updateListings task');

    // Initialize ZillowService and ListingRepository
    const zillowService = new ZillowService();
    const listingRepository = new ListingRepository();

    // Fetch the latest listings from Zillow API
    const latestListings: ApartmentListing[] = await zillowService.getLatestListings();
    logger.info(`Fetched ${latestListings.length} listings from Zillow`);

    // Get existing listings from the database
    const existingListings: ApartmentListing[] = await listingRepository.getAllListings();

    // Update existing listings and add new ones
    const updatedCount = await updateExistingListings(existingListings, latestListings);
    const newCount = await addNewListings(existingListings, latestListings);

    // Remove listings that are no longer available
    const removedCount = await removeUnavailableListings(existingListings, latestListings);

    logger.info(`Updated ${updatedCount} listings, added ${newCount} new listings, and removed ${removedCount} listings`);
  } catch (error) {
    handleUpdateError(error);
  }
}

/**
 * Updates existing listings with new information
 */
async function updateExistingListings(existingListings: ApartmentListing[], latestListings: ApartmentListing[]): Promise<number> {
  const listingRepository = new ListingRepository();
  let updatedCount = 0;

  for (const existing of existingListings) {
    const updated = latestListings.find(listing => listing.id === existing.id);
    if (updated && JSON.stringify(existing) !== JSON.stringify(updated)) {
      await listingRepository.updateListing(updated);
      updatedCount++;
    }
  }

  return updatedCount;
}

/**
 * Adds new listings to the database
 */
async function addNewListings(existingListings: ApartmentListing[], latestListings: ApartmentListing[]): Promise<number> {
  const listingRepository = new ListingRepository();
  const newListings = latestListings.filter(listing => !existingListings.some(existing => existing.id === listing.id));

  for (const newListing of newListings) {
    await listingRepository.addListing(newListing);
  }

  return newListings.length;
}

/**
 * Removes listings that are no longer available
 */
async function removeUnavailableListings(existingListings: ApartmentListing[], latestListings: ApartmentListing[]): Promise<number> {
  const listingRepository = new ListingRepository();
  const unavailableListings = existingListings.filter(existing => !latestListings.some(latest => latest.id === existing.id));

  for (const unavailableListing of unavailableListings) {
    await listingRepository.removeListing(unavailableListing.id);
  }

  return unavailableListings.length;
}

/**
 * Handles errors that occur during the listing update process
 */
function handleUpdateError(error: Error): void {
  logger.error('Error occurred during listing update:', error);

  // Determine the severity of the error
  const isCritical = error instanceof TypeError || error instanceof ReferenceError;

  if (isCritical) {
    logger.critical('Critical error occurred during listing update. Notifying admin...');
    // Implement notification mechanism here (e.g., email, SMS)
  }

  // Update error tracking metrics
  // Implement error tracking here (e.g., increment error counter in monitoring system)
}

/**
 * Schedules the updateListings task to run periodically
 */
export function scheduleListingUpdates(): void {
  logger.info(`Scheduling listing updates with interval: ${UPDATE_INTERVAL}`);

  cron.schedule(UPDATE_INTERVAL, async () => {
    logger.info('Running scheduled listing update');
    await updateListings();
  });
}

// Export the updateListings function for manual triggering if needed
export { updateListings };

// Human tasks:
// TODO: Review and optimize the update interval for listing updates
// TODO: Implement monitoring and alerting for the update task
// TODO: Create unit and integration tests for the updateListings task
// TODO: Set up appropriate error handling and recovery mechanisms
// TODO: Optimize database operations for large-scale updates
// TODO: Implement a mechanism to handle partial updates in case of failures