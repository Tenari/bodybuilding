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
  - [ ] add workouts (a list of lifts [sets]x[reps] @[weight] where reps and weight are expressed as relative changes over previous workout or previous best)
  - [ ] add program (a series of workouts with rest days)
  - [ ] schedule program
  - [ ] schedule lift

schedule workout (a collection of lifts setXrep @ %of 1RM, rest period, rir)

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
$ add workout

name: ______
muscles worked: calc field lists [muscle]x[sets] including 0.5 for secondary
lift 1: [lifts dropdown v] 
  sets: [sets]
  reps: [exact/previous/best/rir dropdown v] [reps number] {{help copy}}
  weight: [exact/%1RM/previous/best dropdown v] [weight number]
  resting [number] minutes between sets
[+ add lift]
[submit]
```

```
$ add program

day 1: [dropdown workouts or "rest" v]
[+ add day button]
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

LIFT                    SETS  WEIGHT  REST REPS
bench                   2     160     3m   11,11
db flyes                3     25      3m   13,11,10
etc...
```

# HST

12 muscles trained (default 9)
  pick exercises for each muscle
6 days per week (default 3)
2 muscle split (number of distinct lists of muscles worked out in a given workout (default 1))
  pick muscles for each split
2 week blocks (default 2)
3 rep range blocks (default 3)
split rep ranges for isolation? yes (default no)
15/18, 10/13, 5/8 rep ranges

