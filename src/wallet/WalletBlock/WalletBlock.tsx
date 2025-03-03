import { Button } from 'components/atoms/Button';
import { language } from 'helpers/language';
import { useArweaveProvider } from 'providers/ArweaveProvider';

import * as S from './styles';

export default function WalletBlock() {
	const arProvider = useArweaveProvider();

	return (
		<S.Wrapper>
			<p>{language.connect}</p>
			<Button
				type={'primary'}
				label={language.connect}
				handlePress={() => arProvider.setWalletModalVisible(true)}
				useMaxWidth
			/>
		</S.Wrapper>
	);
}
