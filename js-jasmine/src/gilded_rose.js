class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.map((singleItem) => {
      // is the quality low enough to add the points
      const checkQualityMax = (itemQuality, addQuality) => {
        if (itemQuality <= maxQuality - addQuality) {
          return true;
        } else {
          return false;
        }
      };
      // is quality high enough to remove points
      const checkQualityMin = (itemQuality, reduceQuality) => {
        if (itemQuality >= minQuality + reduceQuality) {
          return true;
        } else {
          return false;
        }
      };

      const maxQuality = 50;
      const minQuality = 0;
      const legendary = 'Sulfuras, Hand of Ragnaros';
      const backstagePass = 'Backstage passes to a TAFKAL80ETC concert';
      const brie = 'Aged Brie';
      const conjured = 'Conjured Mana Cake';

      //LEGENDARY PRODUCTS
      if (singleItem.name === legendary) {
        singleItem.quality = 80;
        singleItem.sellIn = singleItem.sellIn;

        // BRIE PRODUCTS
      } else if (singleItem.name === brie) {
        if (singleItem.sellIn > 0) {
          if (checkQualityMax(singleItem.quality, 1)) {
            // check the quality amount is small enough to add 1
            singleItem.quality += 1;
          }
        } else if (singleItem.sellIn <= 0) {
          if (checkQualityMax(singleItem.quality, 2)) {
            // check the quality amount is small enough to add 2
            singleItem.quality += 2;
          }
        }
        // reduce sellin days for brie
        singleItem.sellIn -= 1;

        //BACKSTAGE PASS PRODUCTS
      } else if (singleItem.name === backstagePass) {
        //calculate which date bracket for quality increase
        const earlyPurchaseDate = singleItem.sellIn > 10;
        const standardPurchaseDate =
          singleItem.sellIn <= 10 && singleItem.sellIn > 5;
        const latePurchaseDate =
          singleItem.sellIn <= 5 && singleItem.sellIn > 0;

        if (earlyPurchaseDate && checkQualityMax(singleItem.quality, 1)) {
          singleItem.quality += 1;
        } else if (
          standardPurchaseDate &&
          checkQualityMax(singleItem.quality, 2)
        ) {
          singleItem.quality += 2;
        } else if (latePurchaseDate && checkQualityMax(singleItem.quality, 3)) {
          singleItem.quality += 3;
        } else {
          singleItem.quality = minQuality;
        }
        // reduce sellin for backstage pass
        singleItem.sellIn -= 1;

        // CONJURED PRODUCTS
      } else if (singleItem.name === conjured) {
        if (checkQualityMin(singleItem.quality, 2) && singleItem.sellIn > 0) {
          singleItem.quality -= 2;
        } else if (
          checkQualityMin(singleItem.quality, 4) &&
          singleItem.sellIn <= 0
        ) {
          singleItem.quality -= 4;
        }
        // reduce sellin amount for conjured products
        singleItem.sellIn -= 1;

        // STANDARD PRODUCTS
      } else {
        if (checkQualityMin(singleItem.quality, 1) && singleItem.sellIn > 0) {
          singleItem.quality -= 1;
        } else if (
          checkQualityMin(singleItem.quality, 2) &&
          singleItem.sellIn <= 0
        ) {
          singleItem.quality -= 2;
        }
        // reduce sellin amount for standard products
        singleItem.sellIn -= 1;
      }
    });
    return this.items;
  }
}

module.exports = { Item, Shop };
