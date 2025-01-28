import { ICollection } from '@/_types/collections';

export const collections: ICollection[] = [
    {
        id: 1,
        title: 'left static & at ease',
        cover: '/images/left static & at ease.png',
        releaseDate: '2020-01-01',
        description: 'This is the description for Album 1.',
        tracks: [
            {
                id: 1,
                title: 'Track 1',
                duration: '3:45'
            },
            {
                id: 2,
                title: 'Track 2',
                duration: '4:05'
            },
            {
                id: 3,
                title: 'Track 3',
                duration: '2:50'
            }
        ]
    },
    {
        id: 2,
        title: 'seem real',
        cover: '/images/seems real.png',
        releaseDate: '2020-05-20',
        description: 'This is the description for Album 2.',
        tracks: [
            {
                id: 1,
                title: 'Track 1',
                duration: '3:30'
            },
            {
                id: 2,
                title: 'Track 2',
                duration: '4:15'
            },
            {
                id: 3,
                title: 'Track 3',
                duration: '3:00'
            }
        ]
    },
    {
        id: 3,
        title: 'three',
        cover: '/images/three.png',
        releaseDate: '2019-10-10',
        description: 'This is the description for Album 3.',
        tracks: [
            {
                id: 1,
                title: 'Track 1',
                duration: '4:00'
            },
            {
                id: 2,
                title: 'Track 2',
                duration: '3:50'
            },
            {
                id: 3,
                title: 'Track 3',
                duration: '2:40'
            }
        ]
    },
    {
        id: 4,
        title: 'for before i forget',
        cover: '/images/for before i forget.png',
        releaseDate: '2022-07-15',
        description: 'This is the description for Album 4.',
        tracks: [
            {
                id: 1,
                title: 'Track 1',
                duration: '3:55'
            },
            {
                id: 2,
                title: 'Track 2',
                duration: '4:10'
            },
            {
                id: 3,
                title: 'Track 3',
                duration: '3:20'
            }
        ]
    }
]
