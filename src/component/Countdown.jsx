import React, { useState, useEffect } from "react";

const CountdownTimer = ({ futureDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(futureDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="countdown">
      {Object.keys(timeLeft).length === 0 ? (
        <p>Compte à rebours terminé!</p>
      ) : (
        <p className="countdown">
          Temps restant: {days} jours, {hours} heures, {minutes} minutes,{" "}
          {seconds} secondes
        </p>
      )}
    </div>
  );
};

export default CountdownTimer;
