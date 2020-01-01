/**
 * Block dependencies
 */
import './style.css';
import './utils/block-category.js';

/**
 * Import custom/built-in editor blocks.
 */
import * as spacer from './index.jsx';

export function registerBlocks () {
	[
		spacer,
	].forEach( block => {

		if ( ! block ) {
			return;
		} // End If Statement

		const { name, category, icon, settings } = block;

		wp.blocks.registerBlockType( 
			`mypreview/${ name }`, 
			{ 
				category, 
				icon: { 
					src: icon,
					foreground: '#007CBA'
				}, 
				...settings 
			} 
		);
	} );
};

registerBlocks();