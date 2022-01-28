export interface ClimaResp {
    coord:      Coord;
    weather:    Weather[];
    main:       Main;
    visibility: number;
    wind:       Wind;
    name:       string;
    cod:        number;
    clouds:     number;
}


export interface Coord {
    lon: number;
    lat: number;
}

export interface Main {
    temp:       number;
    feels_like: number;
    temp_min:   number;
    temp_max:   number;
    pressure:   number;
    humidity:   number;
    sea_level:  number;
    grnd_level: number;
}


export interface Weather {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

export interface Wind {
    speed: number;
    deg:   number;
    gust:  number;
}
