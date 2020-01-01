/**
 * Internal block libraries
 */
const { _x } = wp.i18n;
const { Fragment, Component } = wp.element;
const { AlignmentToolbar, BlockControls } = wp.blockEditor;
const { Toolbar } = wp.components;

export default class Controls extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const { 
			attributes,
			setAttributes } = this.props;

		const { 
			visible } = attributes;

		// Visibility
		const {
			desktop: visDesktop,
			laptop: visLaptop,
			tablet: visTablet,
			smartphone: visSmartphone } = visible;

		// Visibility — Desktop
		const onChangeVisDesktop = value => {
			setAttributes( { visible: { 
				...visible,
				desktop: ! visDesktop
			} } );
		};
		// Visibility — Laptop
		const onChangeVisLaptop = value => {
			setAttributes( { visible: { 
				...visible,
				laptop: ! visLaptop
			} } );
		};
		// Visibility — Tablet
		const onChangeVisTablet = value => {
			setAttributes( { visible: { 
				...visible,
				tablet: ! visTablet
			} } );
		};
		// Visibility — Mobile
		const onChangeVisSmartphone = value => {
			setAttributes( { visible: { 
				...visible,
				smartphone: ! visSmartphone
			} } );
		};

		return (
			<Fragment>
				<BlockControls>
					<Toolbar controls={ [
							{
								icon: 'desktop',
								title: _x( 'Hide on desktop?', 'toolbar button', 'spacer-block' ),
								onClick: onChangeVisDesktop,
								isActive: ! visDesktop === false
							},
							{
								icon: 'laptop',
								title: _x( 'Hide on laptop?', 'toolbar button', 'spacer-block' ),
								onClick: onChangeVisLaptop,
								isActive: ! visLaptop === false
							},
							{
								icon: 'tablet',
								title: _x( 'Hide on tablet?', 'toolbar button', 'spacer-block' ),
								onClick: onChangeVisTablet,
								isActive: ! visTablet === false
							},
							{
								icon: 'smartphone',
								title: _x( 'Hide on mobile?', 'toolbar button', 'spacer-block' ),
								onClick: onChangeVisSmartphone,
								isActive: ! visSmartphone === false
							}
						] } 
					/>
				</BlockControls>
			</Fragment>
		);
	}
}