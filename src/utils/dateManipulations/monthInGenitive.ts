const monthsGenitive: Record<string, string> = {
  январь: 'январе',
  февраль: 'феврале',
  март: 'марте',
  апрель: 'апреле',
  май: 'мае',
  июнь: 'июне',
  июль: 'июле',
  август: 'августе',
  сентябрь: 'сентябре',
  октябрь: 'октябре',
  ноябрь: 'ноябре',
  декабрь: 'декабре',
};

export const getMonthInGenitive = (month: string): string => {
  return monthsGenitive[month.toLowerCase()] || month;
};
