import {
  FiFacebook,
  FiTwitter,
  FiYoutube,
  FiInstagram,
  FiTikTok,
  FiLinkedin,
  FiSlack,
} from 'react-icons/fi'
import AppLink from '../AppLink'

import styles from './SocialMedia.module.sass'

const socialMedia = [
  {
    Icon: FiInstagram,
    url: 'https://www.instagram.com/healxyz',
  },
  {
    Icon: FiTikTok,
    url: 'https://www.tiktok.com/@healxyz',
  },
  {
    Icon: FiSlack,
    url: 'https://your-slack-url',
  },
  {
    Icon: FiTwitter,
    url: 'https://twitter.com/healxyz',
  },
]

const SocialMedia = () => {
  return (
    <div className={styles.social}>
      {socialMedia?.map(({ Icon, url }, index) => (
        <AppLink key={index} target="_blank" href={url}>
          <Icon className={styles.icon} />
        </AppLink>
      ))}
    </div>
  )
}

export default SocialMedia
