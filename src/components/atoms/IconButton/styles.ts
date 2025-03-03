import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	position: relative;
	width: fit-content;
`;

export const Primary = styled.div<{
	dimensions: { wrapper: number; icon: number } | undefined;
	sm: boolean | undefined;
	warning: boolean | undefined;
	disabled: boolean | undefined;
	active: boolean | undefined;
}>`
	height: ${(props) => (props.dimensions ? `${props.dimensions.wrapper.toString()}px` : `25px`)};
	width: ${(props) => (props.dimensions ? `${props.dimensions.wrapper.toString()}px` : `25px`)};
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 2.5px 0 0 0;
	background: ${(props) =>
		props.disabled
			? props.theme.colors.button.primary.disabled.background
			: props.active
			? props.theme.colors.button.primary.active.background
			: props.theme.colors.button.primary.background};
	border: 1px solid
		${(props) =>
			props.active ? props.theme.colors.button.primary.active.border : props.theme.colors.button.primary.border};
	border-radius: ${STYLING.dimensions.borderRadius};
	position: relative;
	transition: all 100ms;
	pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};

	svg {
		height: ${(props) => (props.dimensions ? `${props.dimensions.icon.toString()}px` : `10px`)};
		width: ${(props) => (props.dimensions ? `${props.dimensions.icon.toString()}px` : `10px`)};
		fill: ${(props) =>
			props.disabled
				? props.theme.colors.button.primary.disabled.color
				: props.active
				? props.theme.colors.button.primary.color
				: props.theme.colors.font.alt1};
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	&:hover {
		cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
		background: ${(props) =>
			props.disabled
				? props.theme.colors.button.primary.disabled.background
				: props.theme.colors.button.primary.active.background};
		border: 1px solid
			${(props) =>
				props.disabled ? props.theme.colors.button.primary.border : props.theme.colors.button.primary.active.border};
		svg {
			fill: ${(props) =>
				props.disabled ? props.theme.colors.button.primary.disabled.color : props.theme.colors.button.primary.color};
		}
	}
`;

export const Alt1 = styled(Primary)`
	background: ${(props) =>
		props.disabled
			? 'transparent'
			: props.active
			? props.theme.colors.button.primary.active.background
			: 'transparent'};
	border: 1px solid ${(props) => (props.active ? props.theme.colors.button.primary.active.border : 'transparent')};
	&:hover {
		cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
		background: ${(props) => (props.disabled ? 'transparent' : props.theme.colors.button.primary.active.background)};
		border: 1px solid
			${(props) =>
				props.active
					? props.theme.colors.button.primary.active.border
					: props.disabled
					? 'transparent'
					: props.theme.colors.button.primary.active.border};
	}
`;

export const Alt2 = styled(Primary)`
	background: ${(props) =>
		props.disabled
			? props.theme.colors.button.primary.disabled.background
			: props.active
			? props.theme.colors.button.primary.active.background
			: 'transparent'};
	border: 1px solid
		${(props) =>
			props.disabled
				? props.theme.colors.button.primary.disabled.border
				: props.active
				? props.theme.colors.button.primary.active.border
				: 'transparent'};
	&:hover {
		cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
		background: ${(props) => (props.disabled ? 'transparent' : props.theme.colors.button.primary.active.background)};
		border: 1px solid
			${(props) =>
				props.active
					? props.theme.colors.button.primary.active.border
					: props.disabled
					? 'transparent'
					: props.theme.colors.button.primary.active.border};
	}
`;
