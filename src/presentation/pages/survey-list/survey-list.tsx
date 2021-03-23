import { Footer, Logo } from '@/presentation/components'
import React from 'react'
import Styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <header className={Styles.headerWrap}>
        <div className={Styles.headerContent}>
          <Logo />
          <div className={Styles.logoutWrap}>
            <span>Gustavo</span>
            <a href='#'>Logout</a>
          </div>
        </div>
      </header>
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>21</span>
                <span className={Styles.month}>01</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>What is your favorite web framework?</p>
            </div>
            <footer>Check results</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>21</span>
                <span className={Styles.month}>01</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>What is your favorite web framework?</p>
            </div>
            <footer>Check results</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>21</span>
                <span className={Styles.month}>01</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>What is your favorite web framework?</p>
            </div>
            <footer>Check results</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>21</span>
                <span className={Styles.month}>01</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>What is your favorite web framework?</p>
            </div>
            <footer>Check results</footer>
          </li>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>21</span>
                <span className={Styles.month}>01</span>
                <span className={Styles.year}>2021</span>
              </time>
              <p>What is your favorite web framework?</p>
            </div>
            <footer>Check results</footer>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
