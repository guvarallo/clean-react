import React from 'react'

import Styles from './survey-list-styles.scss'
import { Footer, Header, Icon, IconName } from '@/presentation/components'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <Icon className={Styles.iconWrap} iconName={IconName.thumbDown} />
              <time>
                <span className={Styles.day}>21</span>
                <span className={Styles.month}>01</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>What is your favorite web framework?</p>
            </div>
            <footer>Check results</footer>
          </li>
          <li></li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
