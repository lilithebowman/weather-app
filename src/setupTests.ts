import { TextEncoder, TextDecoder } from 'util';
import '@testing-library/jest-dom'

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

jest.mock('./config/config.ts', () => ({
	VITE_WEATHER_API_KEY: 'TEST_API_KEY'
}));
