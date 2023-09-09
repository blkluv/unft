import {
  FiTwitter,
  FiYoutube,
  FiInstagram,
  FiLinkedin,
  FiSlack,
} from 'react-icons/fi'
import AppLink from '../AppLink'

import styles from './SocialMedia.module.sass'

const socialMedia = [
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
