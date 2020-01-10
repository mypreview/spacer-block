/**
 * Block dependencies
 */
import classnames from 'classnames';
import isDarkColor from 'is-dark-color';
import Controls from './Controls.jsx';
import Inspector from './Inspector.jsx';
import applyWithColors from './../utils/withColors';

/**
 * Internal block libraries
 */
const { Fragment, Component } = wp.element;
const { compose } = wp.compose;
const { ResizableBox } = wp.components;

export default compose( applyWithColors ) ( class Edit extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const { 
			setBackgroundColor,
			backgroundColor,
			toggleSelection,
			className,
			isSelected,
			attributes,
			setAttributes } = this.props;

		const { 
			ariaLabel,
			dimensions,
			visible,
			alignment } = attributes;

		// Dimension
		const {
			width,
			height } = dimensions;
		// Visibility
		const {
			desktop: visDesktop,
			laptop: visLaptop,
			tablet: visTablet,
			smartphone: visSmartphone } = visible;
		// Alignment
		const {
			desktop: alignDesktop,
			laptop: alignLaptop,
			tablet: alignTablet,
			smartphone: alignSmartphone } = alignment;
		// Luma
		const getLuma = backgroundColor.color ? isDarkColor( backgroundColor.color ) ? 'dark' : 'light' : null;

		return (
			<Fragment>
				{ isSelected && (
					<Controls
						{ ...this.props }
					/>
				) }
				{ isSelected && (
					<Inspector
						{ ...this.props }
					/>
				) }
				<ResizableBox
					className={ classnames(
	                    className,
                    	{
                    		'is-selected': isSelected,
                    		[`is-${ getLuma }`]: getLuma,
	            			[`hrz-align-dk-${ alignDesktop }`]: alignDesktop,
		                    [`hrz-align-lp-${ alignLaptop }`]: alignLaptop,
		                    [`hrz-align-tb-${ alignTablet }`]: alignTablet,
		                    [`hrz-align-sp-${ alignSmartphone }`]: alignSmartphone,
							'hide-dk': !! visDesktop,
		                    'hide-lp': !! visLaptop,
		                    'hide-tb': !! visTablet,
		                    'hide-sp': !! visSmartphone
                    	}
					) }
					size={ {
						width,
						height,
					} }
					minHeight="1"
					maxWidth="100%"
					maxHeight="1000"
					enable={ {
						top: false,
						right: true,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					} }
					onResizeStop={ ( event, direction, elt, delta ) => {
						setAttributes( { dimensions: {
							width: parseInt( width + delta.width, 10 ),
							height: parseInt( height + delta.height, 10 )
						} } );
						toggleSelection( true );
					} }
					onResizeStart={ () => {
						toggleSelection( false );
					} }
					style={ {
						backgroundColor: backgroundColor.color
					} }
				/>
			</Fragment>
		);
	}
} );