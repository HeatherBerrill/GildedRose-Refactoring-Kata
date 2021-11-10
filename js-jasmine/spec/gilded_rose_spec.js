var { Shop, Item } = require('../src/gilded_rose.js');
describe('Gilded Rose', () => {
  it('should pass the first test', () => {
    const gildedRose = new Shop([new Item('fixme', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual('fixme');
  });

  it('should degrade a standard product by 1 ', () => {
    const gildedRose = new Shop([new Item('spoon', 5, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  });

  it('should decrease sellIn days by 1 each day ', () => {
    const gildedRose = new Shop([new Item('spoon', 3, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(2);
  });

  it('should degrade a standard product by 2 after the sellIn date ', () => {
    const gildedRose = new Shop([new Item('spoon', 0, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
    expect(items[0].sellIn).toBe(-1);
  });

  it('the quality of a product should NOT degrade below 0', () => {
    const gildedRose = new Shop([new Item('spoon', 7, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].quality).not.toBe(-1);
  });

  it('the quality of a product should NOT go above 50', () => {
    const gildedRose = new Shop([new Item('Aged Brie', 7, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
    expect(items[0].quality).not.toBe(51);
  });

  it('should increase a brie product by 1 ', () => {
    const gildedRose = new Shop([new Item('Aged Brie', 5, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
  });

  it('should increase a brie product by 2 after sellIn date has passed ', () => {
    const gildedRose = new Shop([new Item('Aged Brie', 0, 8)]);
    const items = gildedRose.updateQuality();
    console.log(items[0].quality, 'log');
    expect(items[0].quality).toBe(10);
    expect(items[0].sellIn).toBe(-1);
  });

  it('should not change the values of a sulfuras product ', () => {
    const gildedRose = new Shop([new Item('Sulfuras, Hand of Ragnaros', 5, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(5);
    expect(items[0].sellIn).toBe(5);
  });

  it('should increase quality of backstage pass by 1, more than 10 days from concert', () => {
    const gildedRose = new Shop([
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 25)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(26);
    expect(items[0].sellIn).toBe(14);
  });

  it('should increase quality of backstage pass by 2, between 10 & 5 days from concert', () => {
    const gildedRose = new Shop([
      new Item('Backstage passes to a TAFKAL80ETC concert', 9, 25)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(27);
    expect(items[0].sellIn).toBe(8);
  });

  it('should increase quality of backstage pass by 3, 5 days or less before concert', () => {
    const gildedRose = new Shop([
      new Item('Backstage passes to a TAFKAL80ETC concert', 5, 25)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(28);
    expect(items[0].sellIn).toBe(4);
  });

  it('should drop quality to 0 after concert has happened', () => {
    const gildedRose = new Shop([
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 25)
    ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });
});
