import React, { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';
import AppLink from '../AppLink';
import Link from 'next/link'; // Add this import at the top of your file
import Icon from '../Icon';
import Image from 'next/image';
import User from './User';
import Theme from '../Theme';
import Modal from '../Modal';
import OAuth from '../OAuth';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useStateContext } from '../../utils/context/StateContext';
import { getToken } from '../../utils/token';

import styles from './Header.module.sass';

const Headers = ({ navigation }) => {
  const [visibleNav, setVisibleNav] = useState(false);
  const [visibleAuthModal, setVisibleAuthModal] = useState(false);

  const { cosmicUser, setCosmicUser } = useStateContext();

  const handleOAuth = useCallback(
    (user) => {
      !cosmicUser.hasOwnProperty('id') &&
        user?.hasOwnProperty('id') &&
        setCosmicUser(user);
    },
    [cosmicUser, setCosmicUser]
  );

  useEffect(() => {
    let isMounted = true;
    const uNFTUser = getToken();

    if (
      isMounted &&
      !cosmicUser?.hasOwnProperty('id') &&
      uNFTUser?.hasOwnProperty('id')
    ) {
      setCosmicUser(uNFTUser);
    }

    return () => {
      isMounted = false;
    };
  }, [cosmicUser, setCosmicUser]);

  return (
    <>
      <header className={styles.header}>
  <div className={cn('container', styles.container)} aria-hidden="true">
    <Link href="https://healxyz.com" passHref>
      <a className={styles.logo}>
        <Image
          width={256}
          height={120}
          objectFit="contain"
          className={styles.pic}
          src={navigation['logo']?.imgix_url}
          alt="Logo"
          priority
        />
      </a>
    </Link>
    <div className={cn(styles.wrapper, { [styles.active]: visibleNav })}>
      <nav className={styles.nav}>
        {navigation['menu']?.map((x, index) => (
          <Link
            href={x?.url || `/search`}
            key={index}
          >
            <a aria-label="navigation" className={styles.link}>
              {x.title}
            </a>
          </Link>
              ))}
            </nav>
          </div>
          <div className={styles.version}>
            <Theme className="theme-big" />
          </div>
          <AppLink
            aria-label="search"
            aria-hidden="true"
            className={cn('button-small', styles.button)}
            href={`/search`}
          >
            <Icon name="search" size="20" />
            Search
          </AppLink>
          <SignedOut>
            <button
              aria-label="login"
              aria-hidden="true"
              className={cn('button-small', styles.button, styles.login)}
              onClick={() => setVisibleAuthModal(true)}
            >
              Login
            </button>
          </SignedOut>
          <SignedIn>
            <a href="https://accounts.healxyz.com/sign-in">Logout</a>
          </SignedIn>
          <button
            aria-label="user-information"
            aria-hidden="true"
            className={cn(styles.burger, { [styles.active]: visibleNav })}
            onClick={() => setVisibleNav(!visibleNav)}
          />
        </div>
      </header>
      <Modal
        visible={visibleAuthModal}
        onClose={() => setVisibleAuthModal(false)}
      >
        <OAuth
          className={styles.steps}
          handleOAuth={handleOAuth}
          handleClose={() => setVisibleAuthModal(false)}
        />
      </Modal>
    </>
  );
};

export default Headers;
