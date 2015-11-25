---
layout: home
---

# Introduction
Most Train Operating Companies (TOCs) have to deal with a major safety issue. How often do they have to maintain their trains? This might seem like an easy problem, but it is not. Large TOC’s are not able to keep track of the exact mileage of each Rolling Stock and therefore they cannot determine how often they need to be maintained. We are solving this problem by writing an algorithm, which uses various data streams, to track each rolling stock real time.  Finally, we will use the output of that pattern-matching algorithm to calculate the distance each rolling stock has travelled.

# Background and Context
The solution to the problem lies in matching Train Services to Rolling Stock. Train Operators use the term Train Service to refer to a sequence of locations and times at which a particular service is expected to arrive at or depart from. For instance a service A might depart at 7 am from King’s Cross, arrive at 7.10 am at Holloway and depart at 7.12 from Holloway to Finsbury Park and so on. However we still do not know which physical train (or Rolling Stock) will run service A.

Usually, the Train Operators will create a Diagram that states which particular Rolling Stock will run (part of) a service. Under normal circumstances, the operators follow these plans. But when any disruption occurs, everything needs to be re-planned. Depending on the severity of the problem and the size of the TOC, it is not always possible to keep track of all the decisions that were made.

If no accurate record was kept, at the end of the day the operators need to manually figure out which Rolling Stock ended up running which Service. This is a very time-consuming and error-prone task. However since some of the Rolling Stock has a GPS and we know exactly what happened to each Service, we can use that data, together with the Diagrams and the Schedule, to automate this process. A potential algorithm would consume various real-time data feeds and give as an output which Rolling Stock actually ran which Service.

# Project Requirements
//TODO: Should be more detailed
+ Train Service Real Time Pattern Matching Algorithm
+ Prototype Application that uses the algorithm to match Rolling Stock to Services

# Research

## Infrastructure

## Data

## Algorithms

# Prototype

## Description

## Discoveries

# User Interface

# Testing Strategies

## Unit Tests

## Functional Tests

//TODO: Why did we choose Python, Flask,...
