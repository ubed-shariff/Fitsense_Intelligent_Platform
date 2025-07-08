import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const WorkoutPlan = ({ plan }) => {
  return (
    <div>
      {plan.plan.map((dailyWorkout, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Day {index + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {dailyWorkout.exercises.map((exercise, exerciseIndex) => (
                <ListItem key={exerciseIndex}>
                  <ListItemText
                    primary={exercise.name}
                    secondary={`Sets: ${exercise.sets}, Reps: ${exercise.reps || 'N/A'}, Duration: ${
                      exercise.duration_minutes || 'N/A'
                    } mins`}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default WorkoutPlan;