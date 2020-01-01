/**
 * Block dependencies
 */
import defaultTabs from './../utils/tabs';
import applyWithColors from './../utils/withColors';

/**
 * Internal block libraries
 */
const { _x } = wp.i18n;
const { Fragment, Component } = wp.element;
const { compose } = wp.compose;
const { InspectorControls, InspectorAdvancedControls, PanelColorSettings, AlignmentToolbar } = wp.blockEditor;
const { PanelBody, ToggleControl, RangeControl, TextControl, TabPanel, BaseControl, ExternalLink, withFallbackStyles } = wp.components;

/**
 * Contrast checker
 */
const { getComputedStyle } = window;
const FallbackStyles = withFallbackStyles( ( node, ownProps ) => {
	const { 
		backgroundColor } = ownProps.attributes,
	editableNode = node.querySelector( '[contenteditable="true"]' ),
	computedStyles = editableNode ? getComputedStyle( editableNode ) : null;

	return {
		fallbackBackgroundColor: backgroundColor || ! computedStyles ? undefined : getComputedStyle.backgroundColor
	};
} );

export default compose( applyWithColors ) ( class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		const { 
			fallbackBackgroundColor,
			setBackgroundColor,
			backgroundColor,
			attributes,
			setAttributes } = this.props;

		const { 
			dimensions,
			visible,
			alignment,
			ariaLabel } = attributes;

		// Dimension
		const {
			width,
			height } = dimensions;
		// Alignment
		const {
			desktop: alignDesktop,
			laptop: alignLaptop,
			tablet: alignTablet,
			smartphone: alignSmartphone } = alignment;
		// Visibility
		const {
			desktop: visDesktop,
			laptop: visLaptop,
			tablet: visTablet,
			smartphone: visSmartphone } = visible;

		// Dimension — Width
		const onChangeWidth = value => {
			setAttributes( { dimensions: { 
				...dimensions,
				width: parseInt( value )
			} } );
		};
		// Dimension — Height
		const onChangeHeight = value => {
			setAttributes( { dimensions: { 
				...dimensions,
				height: parseInt( value )
			} } );
		};
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
		// Alignment — Desktop
		const onChangeAlignDesktop = value => {
			setAttributes( { alignment: { 
				...alignment,
				desktop: value
			} } );
		};
		// Alignment — Laptop
		const onChangeAlignLaptop = value => {
			setAttributes( { alignment: { 
				...alignment,
				laptop: value
			} } );
		};
		// Alignment — Tablet
		const onChangeAlignTablet = value => {
			setAttributes( { alignment: { 
				...alignment,
				tablet: value
			} } );
		};
		// Alignment — Mobile
		const onChangeAlignSmartphone = value => {
			setAttributes( { alignment: { 
				...alignment,
				smartphone: value
			} } );
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody 
						initialOpen={ true }
					>
						<RangeControl
	                        label={ _x( 'Width', 'control label', 'spacer-block' ) }
	                        value={ width }
	                        initialPosition={ width }
	                        onChange={ onChangeWidth }
	                        step="1"
	                        min="1"
	                        max="1440"
	                    />
						<RangeControl
	                        label={ _x( 'Height', 'control label', 'spacer-block' ) }
	                        value={ height }
	                        initialPosition={ height }
	                        onChange={ onChangeHeight }
	                        step="1"
	                        min="1"
	                        max="1000"
	                    />
					</PanelBody>
					<PanelBody 
						title={ _x( 'Visibility Settings', 'panel title', 'spacer-block' ) }
						initialOpen={ false }
					>
						<TabPanel 
                        	className="components-tab-panel components-insp-tabs"
					        activeClass="components-insp-tabs__active"
					        tabs={ defaultTabs }
					    >
					        {
					            tab => {
					            	return (
					            		<Fragment>
						            		{ 'desktop' === tab.name && (
						            			<ToggleControl
													label={ _x( 'Hide from the view?', 'control label', 'spacer-block' ) }
													checked={ !! visDesktop }
													onChange={ onChangeVisDesktop }
												/>
						            		) }
						            		{ 'laptop' === tab.name && (
						            			<ToggleControl
													label={ _x( 'Hide from the view?', 'control label', 'spacer-block' ) }
													checked={ !! visLaptop }
													onChange={ onChangeVisLaptop }
												/>
						            		) }
						            		{ 'tablet' === tab.name && (
						            			<ToggleControl
													label={ _x( 'Hide from the view?', 'control label', 'spacer-block' ) }
													checked={ !! visTablet }
													onChange={ onChangeVisTablet }
												/>
						            		) }
						            		{ 'smartphone' === tab.name && (
						            			<ToggleControl
													label={ _x( 'Hide from the view?', 'control label', 'spacer-block' ) }
													checked={ !! visSmartphone }
													onChange={ onChangeVisSmartphone }
												/>
						            		) }
					            		</Fragment>
					            	)
					            }
					        }
					    </TabPanel>
					</PanelBody>
					<PanelBody 
						title={ _x( 'Alignment Settings', 'panel title', 'spacer-block' ) }
						initialOpen={ false }
					>
                        <TabPanel 
                        	className="components-tab-panel components-insp-tabs"
				        	activeClass="components-insp-tabs__active"
					        tabs={ defaultTabs }
					    >
					        {
					            tab => {
					            	return (
					            		<Fragment>
						            		{ 'desktop' === tab.name && (
						            			<AlignmentToolbar
						                    		isCollapsed={ false }
													value={ alignDesktop }
													onChange={ onChangeAlignDesktop }
												/>
						            		) }
						            		{ 'laptop' === tab.name && (
						            			<AlignmentToolbar
						                    		isCollapsed={ false }
													value={ alignLaptop }
													onChange={ onChangeAlignLaptop }
												/>
						            		) }
						            		{ 'tablet' === tab.name && (
						            			<AlignmentToolbar
						                    		isCollapsed={ false }
													value={ alignTablet }
													onChange={ onChangeAlignTablet }
												/>
						            		) }
						            		{ 'smartphone' === tab.name && (
						            			<AlignmentToolbar
						                    		isCollapsed={ false }
													value={ alignSmartphone }
													onChange={ onChangeAlignSmartphone }
												/>
						            		) }
					            		</Fragment>
					            	)
					            }
					        }
					    </TabPanel>
                    </PanelBody>
					<PanelColorSettings
						title={ _x( 'Color Settings', 'control label', 'spacer-block' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: backgroundColor.color,
								onChange: setBackgroundColor,
								label: _x( 'Background', 'color label', 'spacer-block' )
							}
						] }
					/>
					<PanelBody 
						title={ sprintf( _x( 'Looking for Help? %s', 'panel title', 'spacer-block' ), '⚡' ) }
						initialOpen={ false }
					>
						<BaseControl>
							<p>{ _x( 'I am a full-stack developer with over five years of experience in WordPress theme and plugin development, and would love to have the opportunity to discuss your project with you.', 'upsell', 'spacer-block' ) }</p>
							<ExternalLink 
	                            href={ 'https://www.upwork.com/o/profiles/users/_~016ad17ad3fc5cce94/' }
	                        >
	                            { _x( 'Hire Me!', 'upsell', 'spacer-block' ) }
	                        </ExternalLink>
						</BaseControl>
						<BaseControl
							className="components-base-control--label-block"
							label={ _x( 'Enjoying this block?', 'upsell', 'spacer-block' ) }
						>
							<ExternalLink 
	                            href={ 'https://wordpress.org/support/plugin/container-block/reviews' }
	                        >
	                            { sprintf( _x( 'Why not leave this plugin a %s review on WordPress.org!', 'upsell', 'spacer-block' ), '⭐⭐⭐⭐⭐' ) }
	                        </ExternalLink>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
				<InspectorAdvancedControls>
					<TextControl
				        label={ _x( 'Aria Label', 'control label', 'spacer-block' ) }
				        help={ _x( 'This attribute is used to define a string that labels the current element. You might use it in cases where a text label is not visible on the screen.', 'control help', 'spacer-block' ) }
				        value={ ariaLabel }
				        onChange={ value => setAttributes( { ariaLabel: value } ) }
				    />
				</InspectorAdvancedControls>
			</Fragment>
		);
	}
} );