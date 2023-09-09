import React, { useEffect, useState, useCallback } from 'react'
import Head from 'next/head'
import Header from '../Header'
import Footer from '../Footer'
import AppLink from '../AppLink'
import { useStateContext } from '../../utils/context/StateContext'

import styles from './Layout.module.sass'
import { Meta, PageMeta } from '../Meta'

const Layout = ({ children, title, navigationPaths }) => {
  const { navigation, setNavigation } = useStateContext()

  useEffect(() => {
    let isMounted = true

    if (
      !navigation?.hasOwnProperty('menu') &&
      navigationPaths?.hasOwnProperty('menu') &&
      isMounted
    ) {
      setNavigation(navigationPaths)
    }

    return () => {
      isMounted = false
    }
  }, [navigation, navigationPaths, setNavigation])

  return (
    <>
      <Meta />
      <PageMeta
        title={'uNFT Marketplace'}
        description={
          'The #1 spiritual economy marketplace'
        }
      />
      <div className={styles.github}>
        <p className={styles.source}>
          Follow us on TikTok to find Heal® {' '}
          <span className={styles.github}>
            <a
              className={styles.github}
              href="https://tiktok.com/@healxyz"
              target="_parent"
            >
             services
            </a>
          </span>
          .
        </p>
      </div>
      <div className={styles.page}>
        <Header navigation={navigationPaths || navigation} />
        <main className={styles.inner}>{children}</main>
        <Footer navigation={navigationPaths || navigation} />
      </div>
    </>
  )
}

export default Layout
