/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['@testing-library/jest-dom'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy'
	},
	transform: {
		'^.+\\.tsx?$': [
			'ts-jest',
			{
				useESM: true,
				tsconfig: 'tsconfig.json'
			}
		]
	},
	extensionsToTreatAsEsm: ['.ts', '.tsx']
}
