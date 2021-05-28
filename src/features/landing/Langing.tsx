import { Button, Flex, Heading, HStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { ReactElement } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { showLoginModal } from '../app/appSlice';
import { LoginModal } from '../auth/LoginModal';
import { MapListings } from '../listings/mapListings/MapListings';
import { ReactComponent as Img1 } from './assets/img1.svg';
import { ReactComponent as Img2 } from './assets/img2.svg';
import { ReactComponent as Img3 } from './assets/img3.svg';
import { ReactComponent as Img4 } from './assets/img4.svg';
import { ReactComponent as Img5 } from './assets/img5.svg';
import { ReactComponent as Img6 } from './assets/img6.svg';
import { ReactComponent as Img7 } from './assets/img7.svg';
import { ReactComponent as Img8 } from './assets/img8.svg';
import './Langing.css';

export const Landing = (): ReactElement => {
  const BgIcons = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8];
  const randomX = () => Math.floor(Math.random() * (window.innerWidth - 30));
  const randomY = () => Math.floor(Math.random() * (window.innerHeight - 30));
  const randomArray = (fn: (arg: number) => number): number[] => {
    const arr = new Array(10).fill(0).map(fn);
    arr.push(arr[0]);
    return arr;
  };
  const dispatch = useAppDispatch();
  return (
    <Flex
      bg="gray.900"
      color="white"
      h="100vh"
      w="100vw"
      zIndex="3"
      flexDirection={['column', 'row']}
    >
      <Flex
        flexGrow={1}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        h={['100%', 'auto']}
        zIndex={10}
      >
        <Heading size="4xl" className="noCursor">
          Rent
        </Heading>
        <Heading size="4xl" className="noCursor">
          Sell
        </Heading>
        <Heading size="4xl" className="noCursor">
          Trade
        </Heading>
        <HStack mt={8}>
          <Button
            variant="outline"
            onClick={() => dispatch(showLoginModal(true))}
          >
            Sign Up
          </Button>
          <Button
            variant="outline"
            onClick={() => dispatch(showLoginModal(false))}
          >
            Log In
          </Button>
        </HStack>
      </Flex>

      <Flex
        m={8}
        zIndex={10}
        minW="50%"
        bg="white"
        borderRadius="25px"
        color="black"
        alignItems="center"
        flexDir="column"
      >
        <MapListings onMarkerClick={undefined} />
      </Flex>

      {BgIcons.map((Ic) => (
        <motion.div
          className="holder"
          animate={{
            left: randomArray(randomX),
            top: randomArray(randomY),
          }}
          transition={{
            repeat: Infinity,
            duration: 60,
          }}
        >
          <Ic height="30" width="30" fill="#9AE6B4" />
        </motion.div>
      ))}
      <LoginModal />
    </Flex>
  );
};
