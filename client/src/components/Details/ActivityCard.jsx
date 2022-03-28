import React from 'react';
import './ActivityCard.css'

const ActivityCard = (activity) => {
      return (
        <div className='activity-card'>
            {activity && (
            <div>    
            <p><strong>Actividad: </strong>{activity.name}</p>
            <p><strong>Dificultad: </strong>{activity.difficulty}</p>
            <p><strong>Duracion: </strong>{activity.duration}</p>
            <p><strong>Temporada: </strong>{activity.season}</p>
            </div>
            )}           
        </div>
    );
};
export default ActivityCard;