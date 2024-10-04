// import { ViewStyle, TextStyle } from 'react-native';

export const ContextProp = {
  context: undefined, // Replace undefined with a default value if necessary
};

export const MarkingTypes = {
  DOT: "dot",
  MULTI_DOT: "multi-dot",
  PERIOD: "period",
  MULTI_PERIOD: "multi-period",
  CUSTOM: "custom",
};

export const DayState = {
  SELECTED: "selected",
  DISABLED: "disabled",
  INACTIVE: "inactive",
  TODAY: "today",
  NONE: "", // Default or empty state
};

export const Direction = {
  LEFT: "left",
  RIGHT: "right",
};

export const DateData = {
  year: 0,
  month: 0,
  day: 0,
  timestamp: 0,
  dateString: "",
};

export const Theme = {
  timelineContainer: {},
  contentStyle: {},
  event: {},
  eventTitle: {},
  eventSummary: {},
  eventTimes: {},
  line: {},
  verticalLine: {},
  nowIndicatorLine: {},
  nowIndicatorKnob: {},
  timeLabel: {},
  todayTextColor: "",
  calendarBackground: "",
  indicatorColor: "",
  textSectionTitleColor: "",
  textSectionTitleDisabledColor: "",
  dayTextColor: "",
  selectedDayTextColor: "",
  monthTextColor: "",
  selectedDayBackgroundColor: "",
  arrowColor: "",
  textDisabledColor: "",
  textInactiveColor: "",
  backgroundColor: "",
  dotColor: "",
  selectedDotColor: "",
  disabledArrowColor: "",
  textDayFontFamily: "System", // Default font family
  textMonthFontFamily: "System", // Default font family
  textDayHeaderFontFamily: "System", // Default font family
  textDayFontWeight: "normal", // Default font weight
  textMonthFontWeight: "bold", // Default font weight
  textDayHeaderFontWeight: "normal", // Default font weight
  textDayFontSize: 14, // Default font size
  textMonthFontSize: 16, // Default font size
  textDayHeaderFontSize: 12, // Default font size
  agendaDayTextColor: "",
  agendaDayNumColor: "",
  agendaTodayColor: "",
  agendaKnobColor: "",
  todayButtonFontFamily: "System", // Default font family
  todayButtonFontWeight: "normal", // Default font weight
  todayButtonFontSize: 14, // Default font size
  textDayStyle: {},
  dotStyle: {},
  arrowStyle: {}, // Ensure ViewStyle is replaced with an empty object
  todayBackgroundColor: "",
  disabledDotColor: "",
  inactiveDotColor: "",
  todayDotColor: "",
  todayButtonTextColor: "",
  todayButtonPosition: "",
  arrowHeight: 0,
  arrowWidth: 0,
  weekVerticalMargin: 0,
  reservationsBackgroundColor: "",
  stylesheet: {
    calendar: {
      main: {},
      header: {},
    },
    day: {
      basic: {},
      period: {},
    },
    dot: {},
    marking: {},
    "calendar-list": {
      main: {},
    },
    agenda: {
      main: {},
      list: {},
    },
    expandable: {
      main: {},
    },
  },
};

export const AgendaEntry = {
  name: "",
  height: 0,
  day: "",
};

export const AgendaSchedule = {};

export const DayAgenda = {
  reservation: undefined, // Replace undefined with a default value if necessary
  date: undefined, // Replace undefined with a default value if necessary
};
