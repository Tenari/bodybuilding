# Features

- [x] concepts tree
- [ ] nutrition tools
  - [ ] add/show ingredients
  - [ ] add/show meals
  - [ ] log meal / show meal history / show day nutrition
  - [ ] set nutrition goals (daily cal/prot/fat/carb)
- [ ] body tools
  - [ ] set body goals (bodypart measurements, weight, body fat %)
  - [ ] log weight, bodypart measurements, bodyfat %
  - [ ] show trends, close to goal, charts
- [ ] training tools
  - [ ] setup muscles which can be worked (big vs little)
  - [ ] add lifts (a name, a calculated 1RM, a primary and optional secondary muscle worked, compound bool, ideal rep-range)
  - [ ] schedule workout (a collection of lifts setXrep @ %of 1RM, rest period, rir)
  - [ ] add muscle-scheme (a list of liftXsets with a rep-range to work through that constitutes your workout for a given muscle)
  - [ ] add workouts (a collection of muscle-schemes)
  - [ ] add week (a 7 day list of rest or workout references, with a goal rep-change (0=stay same, 1=add 1 rep to one set, etc) and a goal rir)
  - [ ] add program (a series of weeks)
  - [ ] schedule program


# mocks

```
$ add lift

name: _____
known weight: [weight]x[reps]
primary muscle: [dropdown v]
secondary muscle: [dropdown v] (optional)
compound: [x]
ideal rep range: [num] - [num]
```

```
$ add muscle-scheme

name: ______
muscle: [dropdown v]
lift 1: [dropdown v] [sets] optional swapper [dropdown v]
[+ add lift]
```

```
$ add workout

name: ______
muscle-scheme 1: [dropdown v]
muscle-scheme 2: [dropdown v]
muscle-scheme 3: [dropdown v]
muscle-scheme 4: [dropdown v]
muscle-scheme 5: [dropdown v]
[+ add muscle-scheme]
[submit]
```

```
$ add week

name: ______

sun: [dropdown v] rest or choose a workout
     goal rep-change: [num]
     rir: [num]
mon: [dropdown v] rest or choose a workout
     goal rep-change: [num]
     rir: [num]
tue: [dropdown v] rest or choose a workout
     goal rep-change: [num]
     rir: [num]
wed: [dropdown v] rest or choose a workout
     goal rep-change: [num]
     rir: [num]
thu: [dropdown v] rest or choose a workout
     goal rep-change: [num]
     rir: [num]
fri: [dropdown v] rest or choose a workout
     goal rep-change: [num]
     rir: [num]
sat: [dropdown v] rest or choose a workout
     goal rep-change: [num]
     rir: [num]
[submit]
```

```
$ add program

week 1: [dropdown v] match previous
week 2: [dropdown v] improve reps
week 3: [dropdown v] improve reps
week 4: [dropdown v] improve reps
week 5: [dropdown v] deload
[+ add week button]
[submit]
```

```
$ show workout

Today's workout

Big muscles:
  chest
Little muscles
  neck
  biceps
  side delts
  abs

LIFT                    SETS  WEIGHT  REST PREV      BEST      GOAL
bench                   2     160     3m   11,11     12,11     12,12
db flyes                3     25      3m   13,11,10  13,11,10  13,12,10
etc...
```
