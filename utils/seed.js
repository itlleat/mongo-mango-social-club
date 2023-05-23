const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('Rollerblading into oblivion...');
    await Thought.deleteMany({});
    await User.deleteMany({});
   
    const users = [
            { username: 'Gorgutz69', email: 'krallice@palace.com' },
            { username: 'Honk3yBvtt', email: 'dummy.thicc@dummythick.com' },
            { username: '00Kevin', email: 'odd@job.com' },
            { username: 'W4ltherPWhite', email: 'gaveup@pinkm4n.com' },
            { username: 'SamJaxATK', email: 'itsbeer@drinkit.com' },
            { username: 'SamW1ze', email: 'loyal@dude.com' },
            { username: 'D00mGuy', email: 'they.killed@hisrabbit.com' },
            { username: 'WezleySnipez', email: 'blade.was@realgood.com' },
            { username: 'S4ulG00dman', email: 'better.call@me.com' },
        ];
    await User.collection.insertMany(users);
    console.table(users);
    console.info('Users planted');

    const thoughts = [
            { thoughtText: 'We should make a 3 hour long song!', username: 'Gorgutz69' },
            { thoughtText: 'Made some new chili today!', username: 'Honk3yBvtt' },
            { thoughtText: 'Just got my license renewed! My license to chill :)', username: '00Kevin' },
            { thoughtText: 'Have to cook!', username: 'W4ltherPWhite' },
            { thoughtText: 'Yes he deserved to die, and I hope he rots in hell!', username: 'SamJaxATK' },
            { thoughtText: 'Three really is a crowd :/', username: 'SamW1ze' },
            { thoughtText: 'Rip and tear, until it is done.', username: 'D00mGuy' },
            { thoughtText: 'Some people are always trying to ice skate uphill smh.', username: 'WezleySnipez' },
            { thoughtText: 'Your honor my client would like to plead no cap frfr!', username: 'S4ulG00dman' },
        ];
    await Thought.collection.insertMany(thoughts);
    console.table(thoughts);
    console.info('Digested the thoughts');

    process.exit(0);
});