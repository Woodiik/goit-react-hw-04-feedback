import { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions';
import { Section } from 'components/Section/Section';
import { Notification } from 'components/Notification/Notification';
import { Container } from './Feedback.styled';

export function Feedback() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleUpdate = type => {
    switch (type) {
      case 'good':
        setGood(c => c + 1);
        break;
      case 'neutral':
        setNeutral(c => c + 1);
        break;
      case 'bad':
        setBad(c => c + 1);
        break;
      default:
        throw new Error(`Unvalid type ${type}`);
    }
  };
  const countTotalFeedback = () => {
    return good + neutral + bad;
  };
  const countPositiveFeedbackPercentage = () => {
    return 100 / (countTotalFeedback() / good);
  };
  const options = { good, neutral, bad };
  return (
    <Container>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions
          options={Object.keys(options)}
          onLeaveFeedback={handleUpdate}
        />
      </Section>
      <Section title={'Statistics'}>
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            positivePercentage={countPositiveFeedbackPercentage()}
            total={countTotalFeedback()}
          />
        ) : (
          <Notification message={'There is no feedback'} />
        )}
      </Section>
    </Container>
  );
}
