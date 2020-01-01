/**
 * Block dependencies
 */
import icons from './icons.jsx';
import edit from './components/Edit.jsx';
import save from './components/Save.jsx';
import attributes from './utils/attributes';
import transforms from './utils/transforms';

/**
 * Internal block libraries
 */
const { _x } = wp.i18n;

/**
 * Meta-data for registering block type
 */
const name = 'spacer';
const title = _x( 'Spacer', 'block title', 'spacer-block' );
const category = 'mypreview';
const icon = icons[name];

/**
 * Block settings
 */
const settings = {
    title,
    description: _x( 'Provides an easy way to insert blank areas with a customizable height and width between elements and toggle the visibility of it within the breakpoints of the grid system.', 'block description', 'spacer-block' ),
    keywords: [
        _x( 'Gap', 'block keyword', 'spacer-block' ),
        _x( 'Empty', 'block keyword', 'spacer-block' ),
        _x( 'Blank', 'block keyword', 'spacer-block' )
    ],
    supports: {
        anchor: true,
        html: false,
        align: [ 'wide', 'full' ]
    },
    attributes,
    transforms,
    edit,
    save
};

export { name, title, category, icon, settings };