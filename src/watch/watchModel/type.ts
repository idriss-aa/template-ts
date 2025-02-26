type LoopOfNum<N extends number, Acc extends number[] = []> = 
  Acc['length'] extends N 
    ? Acc[number] 
    : LoopOfNum<N, [...Acc, Acc['length']]>;

type TwoDigit<N extends number> =
    `${N}` extends `-${string}` ? never :
    N extends 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
    ? `0${N}`
    : `${N}`;

// Generate "00" to "23" for Hours
export type Hours = TwoDigit<LoopOfNum<24>>;

// Generate "00" to "59" for Minutes and Seconds
export type MinutesAndSeconds = "01" |"02" |"03" |"04" |"05" | "06" | "07" | "08" | "09" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31" | "32" | "33" | "34" | "35" | "36" | "37" | "38" | "39" | "40" | "41" | "42" | "43" | "44" | "45" | "46" | "47" | "48" | "49" | "50" | "51" | "52" | "53" | "54" | "55" | "56" | "57" | "58" | "59";

export const typeofBlinkable = ['hour', 'minute'] as const;

export type BlinkableType = typeof typeofBlinkable[number];

export type WatchSubscribers = {
    setHours?: (hours: Hours) => void;
    setMinutes?: (minutes: MinutesAndSeconds) => void;
    setSeconds?: (seconds: MinutesAndSeconds) => void;
    switchLightMode?: (lightMode: boolean) => void;
    setEditable?:  (editable: BlinkableType | null) => void;
    setIncrease?: (updatedField: BlinkableType, newValue: string) => void;
    setNotification?: (msgNotification: string) => void;
}

export type SubscribersAction = keyof WatchSubscribers;
export type SubscribersFunction = WatchSubscribers[SubscribersAction];