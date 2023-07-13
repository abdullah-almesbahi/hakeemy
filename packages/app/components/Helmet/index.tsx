/**
 *
 * Helmet
 *
 */

import { Helmet as XHelmet } from 'react-helmet-async';
import React from 'react';
import { connect } from 'react-redux';
import { changeUrl } from '../../containers/LanguagePage/ducks';
import { injectIntl } from 'react-intl';
import { compose } from 'redux';
import { getLocalizeRoute, isEmpty } from '../../utils/helper';
import { SITE_URL } from '../../utils/constants';
import { useLocation } from 'react-router';

interface HelmetProps {
  link?: Array<object>;
  titleTemplate: any;
  title: any;
  meta?: any;
  schema?: any;
}

const Helmet: React.SFC<HelmetProps> = props => {
  let _link: any = props.link && props.link.length > 0 ? props.link : [];
  let _meta: any = props.meta && props.meta.length > 0 ? props.meta : [];
  let _schema: any =
    props.schema && props.schema.length > 0 ? props.schema : [];

  const { pathname } = useLocation();
  const { locale } = props.intl;

  const truncateString = (str, num) => {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
      return str;
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...';
  };

  const addGeneral = () => {
    // <meta name="twitter:card" content="summary_large_image" />
    // <meta name="twitter:image" content="https://yoast.com/app/uploads/2018/12/Yoast_SEO_FB-2.png" />

    // <meta property="og:type" content="website" />

    // <meta property="article:modified_time" content="2020-05-19T13:29:30+00:00" />
    // <meta property="og:image" content="https://yoast.com/app/uploads/2010/10/Yoast_SEO_FB-1-1.png" />
    // <meta property="og:image:width" content="1200" />
    // <meta property="og:image:height" content="628" />

    //     <meta property="product:price:amount" content="89"/>
    // <meta property="product:price:currency" content="USD"/>
    // <meta property="product:availability" content="instock"/>
    let data = [
      {
        name: 'robots',
        content: 'index, follow'
      },
      {
        name: 'googlebot',
        content:
          'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
      },
      {
        name: 'bingbot',
        content:
          'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
      },
      {
        property: 'og:locale',
        content: locale
      },
      {
        property: 'og:title',
        content: props.titleTemplate.replace('%s', props.title)
      },
      {
        property: 'og:url',
        content: SITE_URL + pathname
      },
      {
        property: 'og:site_name',
        content: locale == 'ar' ? 'حكيمي' : 'Hakeemy'
      },
      {
        property: 'fb:app_id',
        content: '132106097847859'
      },
      {
        property: 'article:publisher',
        content: 'https://facebook.com/hakeemyinfo'
      },
      {
        name: 'twitter:creator',
        content: '@hakeemyinfo'
      },
      {
        name: 'twitter:title',
        content: props.titleTemplate.replace('%s', props.title)
      },

      {
        name: 'twitter:site',
        content: '@hakeemyinfo'
      }
    ];

    data.push({
      name: 'twitter:image',
      content: !isEmpty(props.img)
        ? props.img
        : 'https://www.hakeemy.com/ms-icon-310x310.png'
    });
    data.push({
      property: 'og:image',
      content: !isEmpty(props.img)
        ? props.img
        : 'https://www.hakeemy.com/ms-icon-310x310.png'
    });
    data.push({
      name: 'twitter:card',
      content: 'summary_large_image'
    });

    if (_meta.length > 0) {
      let foundPageType = false;
      _meta.map(m => {
        if (m.name == 'description' && m.content != '' && m.content != null) {
          let des = m.content
            .replace(/(<([^>]+)>)/gi, '') // strip html tags
            .replace(/\s{2,}/g, ' ') // remove double spaces
            .trim();
          des = truncateString(des, 155);
          data.push({
            property: 'og:description',
            content: des
          });

          data.push({
            name: 'twitter:description',
            content: des
          });
          data.push({ name: 'description', content: des });
        } else {
          data.push(m);
        }
        if (m.property && m.property == 'og:type') {
          foundPageType = true;
        }
      });

      // https://www.hakeemy.com/slider/bannerAr-1587668320737.jpeg

      if (!foundPageType) {
        data.push({
          property: 'og:type',
          content: 'article'
        });
      }
    }

    return data;
  };

  const addCanonical = () => {
    return [
      {
        rel: 'canonical',
        href: SITE_URL + pathname
      }
    ];
  };

  const addHerfLang = () => {
    if (props.urlAr != undefined && props.urlEn != undefined) {
      props.changeUrl(
        getLocalizeRoute(props.urlEn, 'en'),
        getLocalizeRoute(props.urlAr, 'ar')
      );
      return [
        {
          rel: 'alternate',
          href: SITE_URL + getLocalizeRoute(props.urlAr, 'ar'),
          hrefLang: 'ar'
        },
        {
          rel: 'alternate',
          href: SITE_URL + getLocalizeRoute(props.urlEn, 'en'),
          hrefLang: 'en'
        }
      ];
    } else {
      props.changeUrl(
        getLocalizeRoute(pathname, 'en'),
        getLocalizeRoute(pathname, 'ar')
      );
      return [
        {
          rel: 'alternate',
          href: SITE_URL + getLocalizeRoute(pathname, 'ar'),
          hrefLang: 'ar'
        },
        {
          rel: 'alternate',
          href: SITE_URL + getLocalizeRoute(pathname, 'en'),
          hrefLang: 'en'
        }
      ];
    }
  };
  const getLinks = () => {
    // if empty, then add necessary links
    // if (_link.length == 0) {
    _link = _link.concat(addCanonical());
    _link = _link.concat(addHerfLang());
    // }

    return _link;
  };

  const getMeta = () => {
    let data: Array<object> = [];

    data = data.concat(addGeneral());

    return data;
  };

  const addSchemaOrganization = () => {
    return [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@content': 'http://schema.org',
          '@type': 'Organization',
          url: 'https://www.hakeemy.com',
          sameAs: [
            'https://www.linkedin.com/company/hakeemy',
            'https://twitter.com/hakeemyinfo',
            'https://www.facebook.com/hakeemyinfo/',
            'https://www.youtube.com/channel/UC93ioC1waiLjUnL6F-4BwQA',
            'https://www.instagram.com/hakeemy_info/'
          ]
        })
      }
    ];
  };

  const getSchema = () => {
    let data: Array<object> = _schema;

    data = data.concat(addSchemaOrganization());

    return data;
  };

  return (
    <XHelmet
      {...props}
      link={getLinks()}
      meta={getMeta()}
      script={getSchema()}
    />
  );
};

// const mapStateToProps = createStructuredSelector({
//   language: makeSelectLanguage()
// });

// function mapDispatchToProps(dispatch) {
//   return {
//     push: page => dispatch(push(page)),
//     // updateLanguauge2: lang => dispatch(updateLanguage(lang)),
//     dispatch
//   };
// }

const withConnect = connect(
  null,
  // null
  { changeUrl }
);

export default compose(
  withConnect,
  injectIntl
)(Helmet);
