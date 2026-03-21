import ky from 'ky';

export const apiClient = ky.create({
  prefixUrl: process.env.API_URL ?? '',
  timeout: 1500,
});

export const API_KEY = process.env.API_KEY;
