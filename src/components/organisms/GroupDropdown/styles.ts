import styled from 'styled-components';

import { STYLING } from 'helpers/styling';

export const Wrapper = styled.div`
	width: 300px;
	position: absolute;
	top: 100px;
	left: 15px;
	z-index: 1;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadius};
`;

export const Header = styled.div`
	width: 100%;
	display: flex;
	padding: 15px 20px;
	border-bottom: 1px solid ${(props) => props.theme.colors.border.primary};
`;

export const Logo = styled.div`
	height: 40px;
	width: 40px;
	border: 1px solid ${(props) => props.theme.colors.border.primary};
	background: ${(props) => props.theme.colors.container.primary.background};
	border-radius: ${STYLING.dimensions.borderRadius};
	img {
		height: 100%;
		width: 100%;
		object-fit: contain;
	}
`;

export const Title = styled.div`
	margin: 0 0 0 15px;
	span {
		font-size: ${(props) => props.theme.typography.size.lg};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
		max-width: 75%;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

export const Body = styled.div`
	width: 100%;
	padding: 15px 0;
`;

export const Action = styled.button`
	width: 100%;
	padding: 7.5px 20px;
	text-align: left;
	&:hover {
		background: ${(props) => props.theme.colors.button.primary.active.background};
	}
	span {
		font-size: ${(props) => props.theme.typography.size.base};
		font-family: ${(props) => props.theme.typography.family.primary};
		font-weight: ${(props) => props.theme.typography.weight.bold};
		color: ${(props) => props.theme.colors.font.primary};
		max-width: 75%;
		overflow-x: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;

export const SWrapper = styled.div`
	width: fit-content;
	margin: 0 0 0 auto;
`;