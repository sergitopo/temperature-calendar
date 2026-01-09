const constants = {
    s3BucketUrl: 'https://year-temperatures.s3.eu-west-1.amazonaws.com',
    dailyAnomalyColorPalette:  [
        'purple',
        'indigo',
        'blue',
        'normal',
        'yellow',
        'orange',
        'red'
    ],
    dailyColorAnomalyThresholds:  [-5, -3.5, -1.5, 1.5, 3.5, 5],
    dates: [
        {
            key: 'blue',
            popover: {
                label: `Temperatura mitja >1.5º per baix del normal`
            },
            highlight: {
                contentClass: 'anomaly-cold--1',
                fillMode: 'light'
            },
            dates: [],
        },
         {
            key: 'indigo',
            popover: {
                label: `Temperatura mitja >3.5º per baix del normal`
            },
            highlight: {
                contentClass: 'anomaly-cold--2',
                fillMode: 'light'
            },
            dates: [],
        },
         {
            key: 'purple',
            popover: {
                label: `Temperatura mitja >5º per baix del normal`
            },
            highlight: {
                contentClass: 'anomaly-cold--3',
                fillMode: 'light'
            },
            dates: [],
        },
         {
            key: 'red',
            popover: {
                label: `Temperatura mitja >5º per dalt del normal`
            },
            highlight: {
                contentClass: 'anomaly-hot--3',
                fillMode: 'light'
            },
            dates: [],
        },
         {
            key: 'orange',
            popover: {
                label: `Temperatura mitja >3.5º per dalt del normal`
            },
            highlight: {
                contentClass: 'anomaly-hot--2',
                fillMode: 'light'
            },
            dates: [],
        },
        {
            key: 'yellow',
            popover: {
                label: `Temperatura mitja >1.5º per dalt del normal`
            },
            highlight: {
                contentClass: 'anomaly-hot--1',
                fillMode: 'light'
            },
            dates: [],
        },
        {
            key: 'normal',
            popover: {
                label: `Temperatura mitja normal per a la data`
            },
            highlight: {
                contentClass: 'normal',
                fillMode: 'light'
            },
            dates: [],
        }
    ]
}

export default constants;
