import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ApiService } from '../../services/api';
import { API_BASE_URL } from '../../shared/constants/apiEndpoints';

describe('ApiService', () => {
  let apiService: ApiService;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    apiService = new ApiService();
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should create an instance with the correct base URL', () => {
    expect(apiService.api.defaults.baseURL).toBe(API_BASE_URL);
  });

  it('should set the auth token correctly', () => {
    const token = 'test-token';
    apiService.setAuthToken(token);
    expect(apiService.api.defaults.headers.common['Authorization']).toBe(`Bearer ${token}`);

    apiService.setAuthToken(null);
    expect(apiService.api.defaults.headers.common['Authorization']).toBeUndefined();
  });

  it('should handle API errors correctly', () => {
    const mockError = {
      response: {
        data: { message: 'Test error' },
        status: 400,
      },
    };
    const formattedError = apiService.handleApiError(mockError);
    expect(formattedError).toEqual({
      message: 'Test error',
      status: 400,
    });
  });

  it('should perform a GET request successfully', async () => {
    const mockResponse = { data: 'test' };
    mockAxios.onGet('/test').reply(200, mockResponse);

    const response = await apiService.get('/test');
    expect(response).toEqual(mockResponse);
  });

  it('should perform a POST request successfully', async () => {
    const mockResponse = { data: 'test' };
    const postData = { key: 'value' };
    mockAxios.onPost('/test', postData).reply(200, mockResponse);

    const response = await apiService.post('/test', postData);
    expect(response).toEqual(mockResponse);
  });

  it('should perform a PUT request successfully', async () => {
    const mockResponse = { data: 'test' };
    const putData = { key: 'value' };
    mockAxios.onPut('/test', putData).reply(200, mockResponse);

    const response = await apiService.put('/test', putData);
    expect(response).toEqual(mockResponse);
  });

  it('should perform a DELETE request successfully', async () => {
    const mockResponse = { data: 'test' };
    mockAxios.onDelete('/test').reply(200, mockResponse);

    const response = await apiService.delete('/test');
    expect(response).toEqual(mockResponse);
  });

  it('should handle network errors', async () => {
    mockAxios.onGet('/test').networkError();

    await expect(apiService.get('/test')).rejects.toThrow('Network Error');
  });

  it('should handle API errors with error responses', async () => {
    const errorResponse = {
      response: {
        data: { message: 'API Error' },
        status: 400,
      },
    };
    mockAxios.onGet('/test').reply(400, errorResponse.response.data);

    await expect(apiService.get('/test')).rejects.toEqual({
      message: 'API Error',
      status: 400,
    });
  });
});

// Human tasks:
// TODO: Implement tests for request/response interceptors
// TODO: Add tests for different response types (e.g., JSON, blob, text)
// TODO: Implement tests for concurrent requests handling