import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MealCard = ({ meal, title }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography>Name: {meal.name}</Typography>
      <Typography>Calories: {meal.calories}</Typography>
      <Typography>Protein: {meal.protein}g</Typography>
      <Typography>Carbs: {meal.carbs}g</Typography>
      <Typography>Fat: {meal.fat}g</Typography>
    </CardContent>
  </Card>
);

const DietPlan = ({ plan }) => {
  return (
    <div>
      {plan.plan.map((dailyPlan, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Day {index + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <MealCard meal={dailyPlan.breakfast} title="Breakfast" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MealCard meal={dailyPlan.lunch} title="Lunch" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MealCard meal={dailyPlan.dinner} title="Dinner" />
              </Grid>
              {dailyPlan.snacks.map((snack, snackIndex) => (
                <Grid item xs={12} sm={6} md={4} key={snackIndex}>
                  <MealCard meal={snack} title={`Snack ${snackIndex + 1}`} />
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default DietPlan;