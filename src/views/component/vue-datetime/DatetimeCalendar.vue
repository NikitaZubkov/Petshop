<!--
  Внесены изменения: добавлены новые классы для дат в календаре
  Добавлены методы checkWeekDate, saveArrayWeekDate, returnWeekDay
-->

<template>
  <div class="vdatetime-calendar">
    <div class="vdatetime-calendar__navigation">
      <div class="vdatetime-calendar__navigation--previous" @click="previousMonth">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.3 102.8">
          <path fill="none" stroke="#444" stroke-width="14" stroke-miterlimit="10" d="M56.3 97.8L9.9 51.4 56.3 5"/>
        </svg>
      </div>
      <div class="vdatetime-calendar__current--month">{{ monthName }} {{ newYear }}</div>
      <div class="vdatetime-calendar__navigation--next" @click="nextMonth">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.3 102.8">
          <path fill="none" stroke="#444" stroke-width="14" stroke-miterlimit="10" d="M56.3 97.8L9.9 51.4 56.3 5"/>
        </svg>
      </div>
    </div>
    <div class="vdatetime-calendar__month">
      <div class="vdatetime-calendar__month__weekday" v-for="weekday in weekdays">{{ weekday }}</div>
      <div class="vdatetime-calendar__month__day" v-for="day in days" @click="selectDay(day)" :class="{
      'vdatetime-calendar__month__day--selected': day.selected, 
      'vdatetime-calendar__month__day--week-day': day.weekDay, 
      'vdatetime-calendar__month__day--current': day.current, 
      'vdatetime-calendar__month__day--disabled': day.disabled}">
        <span><span>{{ day.number }}</span></span>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import { monthDayIsDisabled, monthDays, months, weekdays } from './util'

export default {
  props: {
    currentDay: {
      type: Number,
      default: null
    },
    currentMonth: {
      type: Number,
      default: null
    },
    currentYear: {
      type: Number,
      default: null
    },
    year: {
      type: Number,
      required: true
    },
    month: {
      type: Number,
      required: true
    },
    day: {
      type: Number,
      default: null
    },
    disabled: {
      type: Array
    },
    minDate: {
      type: DateTime,
      default: null
    },
    maxDate: {
      type: DateTime,
      default: null
    },
    weekStart: {
      type: Number,
      default: 1
    }
  },

  data () {
    return {
      newDate: DateTime.fromObject({ year: this.year, month: this.month, zone: 'UTC' }),
      weekdays: weekdays(this.weekStart),
      months: months(),
      ArrayWeek: []
    }
  },

  computed: {
    newYear () {
      return this.newDate.year
    },
    newMonth () {
      return this.newDate.month
    },
    monthName () {
      return this.months[this.newMonth - 1]
    },
    days () {
      this.checkWeekDate();

      return monthDays(this.newYear, this.newMonth, this.weekStart).map(day => ({
        number: day,
        weekDay: this.returnWeekDay(day),
        current: this.newYear === this.currentYear && this.newMonth === this.currentMonth && day === this.currentDay,
        selected: day && this.year === this.newYear && this.month === this.newMonth && this.day === day,
        disabled: !day || monthDayIsDisabled(this.minDate, this.maxDate, this.newYear, this.newMonth, day)
      }))
    }
  },

  methods: {
    selectDay (day) {
      if (day.disabled) {
        return
      }

      this.$emit('change', this.newYear, this.newMonth, day.number)
    },
    checkWeekDate () {
      var StartCount = this.day + 7;

      if(StartCount < 38) {
        this.saveArrayWeekDate(StartCount)
      }
    },
    saveArrayWeekDate (StartCount) {
      var ArrayWeek = [],
          StartCountNew = StartCount + 7;

      (StartCount <= 31) ? ArrayWeek.push(StartCount) : '';

      for(let i = this.day; i <= 31; i++) {
        if( (StartCountNew <= 31) && (i === StartCount) ) {
          StartCount += 7;
          StartCountNew += 7;
          ArrayWeek.push(StartCount);
        }
      }

      this.ArrayWeek = ArrayWeek;
    },
    returnWeekDay (day) {
      var status = false;

      if( this.ArrayWeek.includes(day)) {
        status = true;
      }

      return status && this.year === this.newYear && this.month === this.newMonth;
    },
    previousMonth () {
      this.newDate = this.newDate.minus({ months: 1 })
    },
    nextMonth () {
      this.newDate = this.newDate.plus({ months: 1 })
    }
  }
}
</script>