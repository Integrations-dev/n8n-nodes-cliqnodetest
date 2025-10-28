import { config } from '@n8n/node-cli/eslint';

export default [
	...config,
	{
		rules: {
			'n8n-nodes-base/node-param-options-type-unsorted-items': 'off',
            'n8n-nodes-base/node-param-description-boolean-without-whether': 'off',
            'n8n-nodes-base/node-param-description-wrong-for-dynamic-options': 'off',
            'n8n-nodes-base/node-param-display-name-wrong-for-dynamic-options': 'off',
            'n8n-nodes-base/node-param-description-missing-from-dynamic-options': 'off',
            'n8n-nodes-base/node-param-description-missing-from-dynamic-multi-options': 'off',
            'n8n-nodes-base/node-param-display-name-miscased': 'off',
            'n8n-nodes-base/node-param-operation-option-action-miscased': 'off',
            'n8n-nodes-base/node-param-display-name-miscased-id': 'off',
            'n8n-nodes-base/node-param-description-excess-final-period': 'off',
            'n8n-nodes-base/node-param-description-unneeded-backticks': 'off',
            'n8n-nodes-base/node-param-default-wrong-for-options': 'off'
		},
	},
];
