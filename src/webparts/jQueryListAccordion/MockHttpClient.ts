import { IAnnouncementItem } from './IAnnouncementListItems';

export default class MockHttpClient {
    private static _items: IAnnouncementItem[] = [
        { Title: 'Section 1', Description: 'Mauris mauris ante, blandit et, ultrices a,it eu erisque vulputate.'},
        { Title: 'Section 2', Description: 'Content 2'},
        { Title: 'Section 3', Description: 'Content 3'}
    ];

    /**
     *  get
     */
    public static  get(): Promise<IAnnouncementItem[]> {
        return new Promise<IAnnouncementItem[]>((resolve) => {
            resolve(MockHttpClient._items);
        });
    }
}