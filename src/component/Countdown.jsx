import React, { useState, useEffect, useCallback } from "react";

const CountdownTimer = ({ futureDate }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(futureDate) - Date.now();

    if (difference <= 0) {
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      centiseconds: Math.floor((difference % 1000) / 10),
    };
    }, [futureDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 10);

    return () => clearInterval(timer);
    }, [calculateTimeLeft]);

  const formatUnit = (value, minimumDigits = 2) =>
    String(value).padStart(minimumDigits, "0");

  const units = timeLeft
    ? [
        {
          label: "Jours",
          value: formatUnit(timeLeft.days, timeLeft.days >= 100 ? 3 : 2),
        },
        { label: "Heures", value: formatUnit(timeLeft.hours) },
        { label: "Minutes", value: formatUnit(timeLeft.minutes) },
        { label: "Secondes", value: formatUnit(timeLeft.seconds) },
        { label: "Centièmes", value: formatUnit(timeLeft.centiseconds) },
      ]
    : [];

  return (
    <div className="countdown">
      {!timeLeft ? (
        <p className="countdown-finished">Compte a rebours termine !</p>
      ) : (
        <div className="countdown-panel">
          <p className="countdown-kicker">Temps restant</p>
          <div className="countdown-display" aria-label="Compte a rebours">
            {units.map((unit, index) => (
              <React.Fragment key={unit.label}>
                <div className="countdown-segment">
                  <span className="countdown-value">{unit.value}</span>
                  <span className="countdown-label">{unit.label}</span>
                </div>
                {index < units.length - 1 ? (
                  <span className="countdown-separator" aria-hidden="true">
                    :
                  </span>
                ) : null}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
