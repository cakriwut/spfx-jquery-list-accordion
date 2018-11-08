import { Version , Environment, EnvironmentType} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './JQueryListAccordionWebPart.module.scss';
import * as strings from 'JQueryListAccordionWebPartStrings';

import MyAccordionTemplate from './MyAccordionTemplate';
import * as jQuery from 'jquery';
import 'jqueryui';

import { SPComponentLoader } from '@microsoft/sp-loader';
import MockHttpClient from './MockHttpClient';
import { SPHttpClient, SPHttpClientResponse } from  '@microsoft/sp-http';
import { IAnnouncementListItems, IAnnouncementItem } from './IAnnouncementListItems';

export interface IJQueryListAccordionWebPartProps {
  description: string;
}

export default class JQueryListAccordionWebPart extends BaseClientSideWebPart<IJQueryListAccordionWebPartProps> {
  /**
   *
   */
  constructor() {
    super();
      SPComponentLoader.loadCss('//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
  }

  public render(): void {
    const accordionOptions: JQueryUI.AccordionOptions = {
      animate: true,
      collapsible: false,
      icons: {
        header: 'ui-icon-circle-arrow-e',
        activeHeader: 'ui-icon-circle-arrow-s'
      }
     };

     this.domElement.innerHTML =  '<div class="accordion"></div>';
     this._renderAsync()
        .then((resolve) => {
            const listContainer: Element = this.domElement.querySelector('.accordion');
            listContainer.innerHTML = resolve;
            jQuery('.accordion',this.domElement).accordion(accordionOptions);
        });     
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  // Data load
  private _getMockListData(): Promise<IAnnouncementListItems> {
    return MockHttpClient.get()
      .then((data: IAnnouncementItem[]) => {
         const listData: IAnnouncementListItems = { value: data};
         return listData;
      }) as Promise<IAnnouncementListItems>;
  }

  private _getActualListData (): Promise<IAnnouncementListItems> {
    return this.context.spHttpClient.get
     (this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('Announcements')/Items`,
              SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
            return response.json();
     });
  }
  // End data load

  private _renderAsync (): Promise<string> {
     return new Promise<string> ((resolve, reject) => {
        if (Environment.type === EnvironmentType.Local) {
          this._getMockListData().then((response) => {
             resolve(MyAccordionTemplate.renderAccordion(response.value));
          });
       } else if (Environment.type === EnvironmentType.SharePoint ||
           Environment.type === EnvironmentType.ClassicSharePoint) {
          this._getActualListData().then((response) => {
             //console.log(response.value);
             resolve(MyAccordionTemplate.renderAccordion(response.value));
           });
        } else {
            resolve('');
        }
     });
 }
  //
}
