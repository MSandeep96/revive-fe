import React, { useState } from 'react';
import {
	Button,
	ButtonGroup,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	ModalBody,
} from '@chakra-ui/react';

import { useAppDispatch } from '../../redux/hooks';
import { closeEmailAuthModal } from '../app/appSlice';

export const EmailAuthModal = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [visible, toggleVisible] = useState(false)
	const [validEmail, setValidEmail] = useState(false)
	const [validPassword, setValidPassword] = useState(false)
	const dispatch = useAppDispatch();

	const togglePasswordVisibility = () => toggleVisible(!visible)

	const validateEmail = (input: string) => {
		return (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input))
	}

	const validatePassword = (input: string) => {
		// Potentially add more rules later
		return (input.length > 10)
	}

	const onEmailChange = (event: any) => {
		const input = event.currentTarget.value;
		if (validateEmail(input)) {
			setValidEmail(true)
		} else setValidEmail(false)
		setEmail(input);
	};

	const onPasswordChange = (event: any) => {
		const input = event.currentTarget.value;
		if (input.length < 64) {
			if (validatePassword(input)) {
				setValidPassword(true)
			} else setValidPassword(false)
			setPassword(input);
		}
	};

	const closeModal = () => {
		dispatch(closeEmailAuthModal())
	}

	return (
		<ModalBody display="flex" flexDir="column" alignItems="center" mb={2}>
			<FormControl
				display="flex"
				flexDir="column"
				alignItems="center"
				mt={4}
			>
				<FormLabel alignSelf="flex-start">Email ID</FormLabel>
				<InputGroup mt={1}>
					<Input
						placeholder="john.doe@example.com"
						value={email}
						onChange={onEmailChange}
						isInvalid={!validEmail}
						errorBorderColor="red.300"
					/>
				</InputGroup>
				&nbsp;
				<FormLabel alignSelf="flex-start">Password</FormLabel>
				<InputGroup mt={1}>
					<Input
						pr="4.5rem"
						type={visible ? "text" : "password"}
						placeholder="Password"
						value={password}
						onChange={onPasswordChange}
						isInvalid={!validPassword}
						errorBorderColor="red.300"
					/>
					<InputRightElement width="4.5rem">
						<Button h="1.75rem" size="sm" onClick={togglePasswordVisibility}>
							{visible ? "Hide" : "Show"}
						</Button>
					</InputRightElement>
				</InputGroup>
				<ButtonGroup spacing="6">
					<Button mx="auto" mt={6} mb={2} bg="black" onClick={closeModal}>
						Back
            	</Button>
					<Button mx="auto" mt={6} mb={2} bg="green.400">
						Submit
            	</Button>
				</ButtonGroup>
			</FormControl>
		</ModalBody>
	);
}
