import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTikTok, faSlack, faTwitter } from '@fortawesome/free-brands-svg-icons';
import AppLink from '../AppLink'; // Import AppLink (ensure the correct path)

import styles from './SocialMedia.module.sass';

const socialMedia = [
  {
    Icon: faInstagram,
    url: 'https://www.instagram.com/healxyz',
  },
  {
    Icon: faTikTok,
    url: 'https://www.tiktok.com/@healxyz',
  },
  {
    Icon: faSlack,
    url: 'https://your-slack-url',
  },
  {
    Icon: faTwitter,
    url: 'https://twitter.com/healxyz',
  },
];

const SocialMedia = () => {
  return (
    <div className={styles.social}>
      {socialMedia?.map(({ Icon, url }, index) => (
        <AppLink key={index} target="_blank" href={url}>
          <FontAwesomeIcon icon={Icon} className={styles.icon} />
        </AppLink>
      ))}
    </div>
  );
};

export default SocialMedia;
