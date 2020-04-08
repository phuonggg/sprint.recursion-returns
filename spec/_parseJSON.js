const { expect } = require("chai");

const { parseJSON } = require("../src/parseJSON");

const parseableStrings = [
  // basic stuff
  "[]",
  '{"foo": ""}',
  "{}",
  '{"foo": "bar"}',
  '["one", "two"]',
  '{"a": "b", "c": "d"}',
  "[null,false,true]",
  '{"foo": true, "bar": false, "baz": null}',
  "[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]",
  '{"boolean, true": true, "boolean, false": false, "null": null }',

  // basic nesting
  '{"a":{"b":"c"}}',
  '{"a":["b", "c"]}',
  '[{"a":"b"}, {"c":"d"}]',
  '{"a":[],"c": {}, "b": true}',
  '[[[["foo"]]]]',

  // escaping
  '["\\\\\\"\\"a\\""]',
  '["and you can\'t escape this"]',

  // reddit json!
  '{"kind": "Listing", "data": {"modhash": "2fgqayt43p89a83db1009111707d8933a7eac9b49a376ac91a", "children": [{"kind": "t3", "data": {"contest_mode": false, "subreddit_name_prefixed": "r/mildlyinteresting", "banned_by": null, "media_embed": {}, "thumbnail_width": 140, "subreddit": "mildlyinteresting", "selftext_html": null, "selftext": "", "likes": null, "suggested_sort": null, "user_reports": [], "secure_media": null, "link_flair_text": null, "id": "6h4p6z", "view_count": null, "secure_media_embed": {}, "clicked": false, "report_reasons": null, "author": "rbards", "saved": false, "mod_reports": [], "name": "t3_6h4p6z", "score": 59918, "approved_by": null, "over_18": false, "domain": "i.redd.it", "hidden": false, "preview": {"images": [{"source": {"url": "https://i.redditmedia.com/ccmscMO4kyezwtRhi8hwcoNCENMnvtWPERSM7AmAT10.jpg?s=f4bbd7a3a3829cbf10d34c3ffe06cb01", "width": 3024, "height": 4032}, "resolutions": [{"url": "https://i.redditmedia.com/ccmscMO4kyezwtRhi8hwcoNCENMnvtWPERSM7AmAT10.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=108&amp;s=0998f10ecf91ae54b84e90bccfcce5b0", "width": 108, "height": 144}, {"url": "https://i.redditmedia.com/ccmscMO4kyezwtRhi8hwcoNCENMnvtWPERSM7AmAT10.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=216&amp;s=c6ee3446bae04268837d96c0dd0daa15", "width": 216, "height": 288}, {"url": "https://i.redditmedia.com/ccmscMO4kyezwtRhi8hwcoNCENMnvtWPERSM7AmAT10.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=320&amp;s=732e6f8c0197a856eee93d1914129e5b", "width": 320, "height": 426}, {"url": "https://i.redditmedia.com/ccmscMO4kyezwtRhi8hwcoNCENMnvtWPERSM7AmAT10.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=640&amp;s=fdc1799efa5671940f5ef29b0d251174", "width": 640, "height": 853}, {"url": "https://i.redditmedia.com/ccmscMO4kyezwtRhi8hwcoNCENMnvtWPERSM7AmAT10.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=960&amp;s=524a49bd28dc6659cffc503b3534f714", "width": 960, "height": 1280}, {"url": "https://i.redditmedia.com/ccmscMO4kyezwtRhi8hwcoNCENMnvtWPERSM7AmAT10.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=1080&amp;s=70d5acf578477f6927003ae0f22709cd", "width": 1080, "height": 1440}], "variants": {}, "id": "PCdKXzcgl_af0Jf68wUU8mR4nLlhnS8rxKU8-Ef-Vj0"}], "enabled": true}, "thumbnail": "https://b.thumbs.redditmedia.com/0cDPrcjbfq3ZXG4zmT2MhoA65EwGmNPm8eZ24pLblLM.jpg", "subreddit_id": "t5_2ti4h", "edited": false, "link_flair_css_class": null, "author_flair_css_class": null, "gilded": 0, "downs": 0, "brand_safe": true, "archived": false, "removal_reason": null, "post_hint": "image", "can_gild": true, "thumbnail_height": 140, "hide_score": false, "spoiler": false, "permalink": "/r/mildlyinteresting/comments/6h4p6z/vending_machine_at_work_made_an_error_and/", "num_reports": null, "locked": false, "stickied": false, "created": 1497436341.0, "url": "https://i.redd.it/o7igmpbovi3z.jpg", "author_flair_text": null, "quarantine": false, "title": "Vending machine at work made an error and distributed everything all at once.", "created_utc": 1497407541.0, "distinguished": null, "media": null, "num_comments": 1982, "is_self": false, "visited": false, "subreddit_type": "public", "is_video": false, "ups": 59918}}], "after": "t3_6h4p6z", "before": null}}',
];

// JSON does not allow you to parse these strings
const unparseableStrings = ['["foo", "bar"', '["foo", "bar\\"]'];

// test cases are described in fixtures.js
describe("parseJSON", () => {
  function testAgainstUnparseable(test, index) {
    it(`should throw an error for invalid JSON, unparseableStrings index: ${index}`, () => {
      const fn = () => {
        parseJSON(test);
      };
      expect(fn).to.throw;
    });
  }

  for (let i = 0; i < unparseableStrings.length; i++) {
    testAgainstUnparseable(unparseableStrings[i], i);
  }

  function testAgainstParseable(test, index) {
    it(`should get the same result as JSON.parse, parseableStrings index: ${index}`, () => {
      const result = parseJSON(test);
      const expected = JSON.parse(test);
      expect(result).to.eql(expected);
    });
  }

  for (let i = 0; i < parseableStrings.length; i++) {
    testAgainstParseable(parseableStrings[i], i);
  }
});
