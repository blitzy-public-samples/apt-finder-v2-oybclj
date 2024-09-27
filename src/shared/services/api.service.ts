import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL, AUTH_ENDPOINTS, USER_ENDPOINTS, FILTER_ENDPOINTS, LISTING_ENDPOINTS, SUBSCRIPTION_ENDPOINTS, ZILLOW_ENDPOINTS } from '../constants/apiEndpoints';
import { UserSignupData, UserProfile } from '../interfaces/user.interface';
import { FilterCreationData, Filter } from '../interfaces/filter.interface';
import { ListingSearchParams, Listing, PaginatedResponse } from '../interfaces/apartment.interface';
import { SubscriptionCreationData, Subscription } from '../interfaces/subscription.interface';
import { ZillowFetchParams } from '../interfaces/zillow.interface';

class ApiService {
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: API_BASE_URL,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
          // Implement token refresh logic here
          // If token refresh is successful, retry the original request
          // If token refresh fails, logout the user
        }
        return Promise.reject(error);
      }
    );
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const response = await this.axios.post(AUTH_ENDPOINTS.LOGIN, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async signup(userData: UserSignupData): Promise<void> {
    try {
      await this.axios.post(AUTH_ENDPOINTS.SIGNUP, userData);
      await this.login(userData.email, userData.password);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.axios.post(AUTH_ENDPOINTS.LOGOUT);
      localStorage.removeItem('token');
      delete this.axios.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async getProfile(): Promise<UserProfile> {
    try {
      const response = await this.axios.get(USER_ENDPOINTS.PROFILE);
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  }

  async updateProfile(profileData: Partial<UserProfile>): Promise<UserProfile> {
    try {
      const response = await this.axios.put(USER_ENDPOINTS.UPDATE_PROFILE, profileData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  async createFilter(filterData: FilterCreationData): Promise<Filter> {
    try {
      const response = await this.axios.post(FILTER_ENDPOINTS.CREATE, filterData);
      return response.data;
    } catch (error) {
      console.error('Create filter error:', error);
      throw error;
    }
  }

  async getFilters(): Promise<Filter[]> {
    try {
      const response = await this.axios.get(FILTER_ENDPOINTS.GET_ALL);
      return response.data;
    } catch (error) {
      console.error('Get filters error:', error);
      throw error;
    }
  }

  async updateFilter(filterId: string, filterData: Partial<FilterCreationData>): Promise<Filter> {
    try {
      const response = await this.axios.put(FILTER_ENDPOINTS.UPDATE.replace(':id', filterId), filterData);
      return response.data;
    } catch (error) {
      console.error('Update filter error:', error);
      throw error;
    }
  }

  async deleteFilter(filterId: string): Promise<void> {
    try {
      await this.axios.delete(FILTER_ENDPOINTS.DELETE.replace(':id', filterId));
    } catch (error) {
      console.error('Delete filter error:', error);
      throw error;
    }
  }

  async searchListings(searchParams: ListingSearchParams): Promise<PaginatedResponse<Listing>> {
    try {
      const response = await this.axios.get(LISTING_ENDPOINTS.SEARCH, { params: searchParams });
      return response.data;
    } catch (error) {
      console.error('Search listings error:', error);
      throw error;
    }
  }

  async getListingById(listingId: string): Promise<Listing> {
    try {
      const response = await this.axios.get(LISTING_ENDPOINTS.GET_BY_ID.replace(':id', listingId));
      return response.data;
    } catch (error) {
      console.error('Get listing by ID error:', error);
      throw error;
    }
  }

  async createSubscription(subscriptionData: SubscriptionCreationData): Promise<Subscription> {
    try {
      const response = await this.axios.post(SUBSCRIPTION_ENDPOINTS.CREATE, subscriptionData);
      return response.data;
    } catch (error) {
      console.error('Create subscription error:', error);
      throw error;
    }
  }

  async getSubscriptions(): Promise<Subscription[]> {
    try {
      const response = await this.axios.get(SUBSCRIPTION_ENDPOINTS.GET_ALL);
      return response.data;
    } catch (error) {
      console.error('Get subscriptions error:', error);
      throw error;
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    try {
      await this.axios.post(SUBSCRIPTION_ENDPOINTS.CANCEL.replace(':id', subscriptionId));
    } catch (error) {
      console.error('Cancel subscription error:', error);
      throw error;
    }
  }

  async fetchZillowListings(params: ZillowFetchParams): Promise<void> {
    try {
      await this.axios.post(ZILLOW_ENDPOINTS.FETCH_LISTINGS, params);
    } catch (error) {
      console.error('Fetch Zillow listings error:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();

// Human tasks:
// 1. Implement proper error handling and logging for API calls
// 2. Set up token refresh mechanism in the request/response interceptors
// 3. Implement rate limiting and request throttling to prevent API abuse