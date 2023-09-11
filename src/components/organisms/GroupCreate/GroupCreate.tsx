import React from 'react';
import { InjectedArweaveSigner } from 'warp-contracts-plugin-signature';

import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { Modal } from 'components/molecules/Modal';
import { language } from 'helpers/language';
import { ResponseType, WalletEnum } from 'helpers/types';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useClientProvider } from 'providers/ClientProvider';

import * as S from './styles';

export default function GroupCreate() {
	const arProvider = useArweaveProvider();
	const cliProvider = useClientProvider();

	const [showModal, setShowModal] = React.useState<boolean>(false);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [submitResponse, setSubmitResponse] = React.useState<ResponseType | null>(null);

	const [title, setTitle] = React.useState<string>('');
	const [initialChannel, setInitialChannel] = React.useState<string>('');
	const [logo, setLogo] = React.useState<any>(null);
	const [logoBuffer, setLogoBuffer] = React.useState<any>(null);
	const [showLogoUpload, setShowLogoUpload] = React.useState(true);

	const logoInputRef = React.useRef<any>(null);

	React.useEffect(() => {
		if (submitResponse && submitResponse.message) alert(submitResponse.message);
	}, [submitResponse])

	function handleImageUpload(event: any) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = () => {
			setLogo(reader.result);
		};
		if (file) {
			reader.readAsDataURL(file);
		}
		const readerBuff = new FileReader();
		readerBuff.onload = () => {
			setLogoBuffer(readerBuff.result);
		};
		if (file) {
			readerBuff.readAsArrayBuffer(file);
		}

		setShowLogoUpload(false);
	}

	function getSubmitDisabled() {
		return !title || !initialChannel;
	}

	async function handleSubmit(e: any) {
		e.preventDefault();
		if (arProvider.walletAddress && cliProvider.lib) {
			setLoading(true);
			try {
				if (arProvider.wallet && window.arweaveWallet) {
					const signer = new InjectedArweaveSigner(arProvider.wallet);
					signer.getAddress = window.arweaveWallet.getActiveAddress;
					await signer.setPublicKey();

					const group = {
						title: title,
						initialChannel: initialChannel,
						logo: {
							src: logo,
							buffer: logoBuffer,
						},
						owner: arProvider.walletAddress,
						wallet: signer,
					};

					const id = await cliProvider.lib.api.createGroup(group);
					console.log(id);
					setSubmitResponse({
						status: true,
						message: `${language.groupCreated}!`,
					});
				} else {
					let message = '';
					if (arProvider.walletType === WalletEnum.arweaveApp && !arProvider.wallet['_address']) {
						message = language.arweaveAppConnectionError;
					} else {
						message = language.errorOccurred;
					}
					setLoading(false);

					setSubmitResponse({
						status: false,
						message: message,
					});
				}
			} catch (e: any) {
				console.error(e);
				let message = '';
				if (e.message) {
					message = e.message;
				} else if (arProvider.walletType === WalletEnum.arweaveApp && !arProvider.wallet['_address']) {
					message = language.arweaveAppConnectionError;
				} else {
					message = language.errorOccurred;
				}
				setLoading(false);
				setSubmitResponse({
					status: false,
					message: message,
				});
			}
			setLoading(false);
		}
	}

	return (
		<>
			<Button type={'primary'} label={language.createGroup} handlePress={() => setShowModal(true)} />
			{showModal && (
				<Modal header={language.createGroup} handleClose={() => setShowModal(false)}>
					<S.Form onSubmit={async (e) => await handleSubmit(e)}>
						<FormField
							label={language.title}
							value={title}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
							disabled={loading}
							invalid={{ status: false, message: null }}
						/>
						<S.ImageWrapper>
							<S.ImageHeader>
								<p>{language.logo}</p>
								<Button
									type={'primary'}
									label={language.upload}
									handlePress={() => logoInputRef.current.click()}
									disabled={loading}
									noMinWidth
								/>
							</S.ImageHeader>
							<S.Image disabled={loading}>
								{showLogoUpload && <label htmlFor={'file-input-banner'}>{language.uploadImage}</label>}
								<input
									ref={logoInputRef}
									id={'file-input-banner'}
									type={'file'}
									accept={'image/*'}
									onChange={(e: any) => handleImageUpload(e)}
									disabled={loading}
								/>
								{logo && <img src={logo} alt={'Preview'} />}
							</S.Image>
						</S.ImageWrapper>
						<FormField
							label={language.initialChannel}
							value={initialChannel}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInitialChannel(e.target.value)}
							disabled={loading}
							invalid={{ status: false, message: null }}
						/>
						<S.SWrapper>
							<Button
								type={'primary'}
								label={language.submit}
								handlePress={async (e) => await handleSubmit(e)}
								loading={loading}
								disabled={getSubmitDisabled() || loading}
								noMinWidth
							/>
						</S.SWrapper>
					</S.Form>
				</Modal>
			)}
		</>
	);
}