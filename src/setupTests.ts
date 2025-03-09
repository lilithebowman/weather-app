import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

jest.mock('./config/config.ts', () => ({
	VITE_WEATHER_API_KEY: 'TEST_API_KEY'
}));
