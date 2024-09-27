import { ListingsService } from '../services';
import { FiltersService } from '../services';
import { SubscriptionsService } from '../services';
import * as nodemailer from 'nodemailer';

interface Listing {
  id: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  // Add other relevant properties
}

interface Filter {
  id: string;
  userId: string;
  criteria: {
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    minBathrooms?: number;
    // Add other relevant criteria
  };
}

export async function sendNotificationsTask(): Promise<void> {
  try {
    // Step 1: Retrieve new listings since the last notification run
    const newListings = await ListingsService.getNewListings();

    // Step 2: Retrieve all active user filters
    const activeFilters = await FiltersService.getActiveFilters();

    // Step 3: For each user filter, check if any new listings match
    for (const filter of activeFilters) {
      const matchingListings = newListings.filter(listing => checkListingAgainstFilter(listing, filter));

      if (matchingListings.length > 0) {
        // Step 4: For matching listings, prepare notification content
        const notificationContent = prepareNotificationContent(matchingListings);

        // Step 5: Send email notifications to users with matching listings
        const userEmail = await SubscriptionsService.getUserEmail(filter.userId);
        await sendEmailNotification(userEmail, 'New Apartment Listings Match Your Criteria', notificationContent);
      }
    }

    // Step 6: Update the last notification timestamp
    await ListingsService.updateLastNotificationTimestamp();

    console.log('Notification task completed successfully');
  } catch (error) {
    console.error('Error in sendNotificationsTask:', error);
    // Implement error handling and logging
  }
}

function checkListingAgainstFilter(listing: Listing, filter: Filter): boolean {
  const { criteria } = filter;

  if (criteria.minPrice && listing.price < criteria.minPrice) return false;
  if (criteria.maxPrice && listing.price > criteria.maxPrice) return false;
  if (criteria.minBedrooms && listing.bedrooms < criteria.minBedrooms) return false;
  if (criteria.minBathrooms && listing.bathrooms < criteria.minBathrooms) return false;

  // Add more criteria checks as needed

  return true;
}

function prepareNotificationContent(listings: Listing[]): string {
  let content = 'New apartment listings matching your criteria:\n\n';

  listings.forEach((listing, index) => {
    content += `${index + 1}. ID: ${listing.id}\n`;
    content += `   Price: $${listing.price}\n`;
    content += `   Bedrooms: ${listing.bedrooms}\n`;
    content += `   Bathrooms: ${listing.bathrooms}\n`;
    content += '\n';
  });

  return content;
}

async function sendEmailNotification(to: string, subject: string, content: string): Promise<void> {
  // Configure nodemailer with SMTP settings
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Create email message
  const message = {
    from: process.env.SMTP_FROM,
    to,
    subject,
    text: content,
  };

  try {
    // Send email
    await transporter.sendMail(message);
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    // Implement error handling and logging
  }
}

// Human tasks (commented)
/*
TODO: Configure SMTP settings for email notifications
TODO: Implement error handling and logging for the notification process
TODO: Set up a scheduling mechanism (e.g., cron job) to run the sendNotificationsTask at regular intervals
TODO: Create email templates for notification content
TODO: Implement rate limiting to prevent overwhelming users with notifications
*/