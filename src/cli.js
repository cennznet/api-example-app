//Parser for CLI commands

// Required imports
const ArgParse = require('argparse');

function balancesConfig(parser) {
    parser.addArgument(
        "asset_id",
        {
            nargs: `?`,
            type: Number,
            action: 'store',
            help: "The Asset ID of Balance to check"
        }
    );
}
//<amount> <asset_id>
function transferConfig(parser) {
    parser.addArgument(
        "to",
        {
            nargs: `1`,
            type: String,
            action: 'store',
            help: "Who's account to tranfer TO"
        }
    );
    parser.addArgument(
        "amount",
        {
            nargs: `1`,
            type: String,
            action: 'store',
            help: "The Amount to transfer"
        }
    );
    parser.addArgument(
        "asset_id",
        {
            nargs: `?`,
            type: Number,
            action: 'store',
            help: "The Asset ID to transfer"
        }
    );
    parser.addArgument(
        "sub",
        {
            nargs: `?`,
            type: Boolean,
            action: 'store',
            help: "Substribe to events regarding this transfer."
        }
    );
}

function addLiquidityConfig(parser) {
    parser.addArgument(
        "asset_id",
        {
            nargs: `1`,
            type: String,
            action: 'store',
            help: "The Asset ID/' exchange pool to add liquidity to."
        }
    );
    parser.addArgument(
        "asset_amount",
        {
            nargs: `1`,
            type: String,
            action: 'store',
            help: "The maximum amount of trade asset to be committed into the exchange reserve pool"
        }
    );
    parser.addArgument(
        "core_amount",
        {
            nargs: `1`,
            type: String,
            action: 'store',
            help: "The amount of core asset to be added to the exchange reserve pool"
        }
    );
}

function removeLiquidityConfig(parser) {
    parser.addArgument(
        "asset_id",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The Asset ID/' exchange pool to remove liquidity from."
        }
    );
    parser.addArgument(
        "amount",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The amount of user's liquidity to withdraw."
        }
    );
    parser.addArgument(
        "min_trade_asset_amount",
        {
            nargs: `?`,
            type: Number,
            action: 'store',
            help: "The minimum amount of trade asset to be withdrawn"
        }
    );
    parser.addArgument(
        "min_core_asset_amount",
        {
            nargs: `?`,
            type: Number,
            action: 'store',
            help: "The minimum amount of core asset to be withdrawn"
        }
    );
}

function liquidityValueConfig(parser) {
    parser.addArgument(
        "account",
        {
            nargs: `1`,
            type: String,
            action: 'store',
            help: "The account you want to query"
        }
    );
    parser.addArgument(
        "asset_id",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The Asset ID/' exchange pool you want to query."
        }
    );
}

function liquidityPriceConfig(parser) {
    parser.addArgument(
        "asset_id",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The Asset ID/' exchange pool you want to query."
        }
    );
    parser.addArgument(
        "amount",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The amount of liquidity you want to query"
        }
    );

}


function buyPriceConfig(parser) {
    parser.addArgument(
        "asset_to_buy",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The ID of the Asset you want to buy"
        }
    );
    parser.addArgument(
        "buy_amount",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The amount of asset you want to buy"
        }
    );
    parser.addArgument(
        "asset_to_sell",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The ID of the Asset you want to sell. The price will be given in this asset."
        }
    );
}

function sellPriceConfig(parser) {
    parser.addArgument(
        "asset_to_sell",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The ID of the Asset you want to sell. The price will be given in this asset."
        }
    );
    parser.addArgument(
        "sell_amount",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The amount of asset you want to sell"
        }
    );
    parser.addArgument(
        "asset_to_buy",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The ID of the Asset you want to buy."
        }
    );
}

function buyAssetConfig(parser) {
    parser.addArgument(
        "recipient",
        {
            nargs: `1`,
            type: String,
            action: 'store',
            help: "Who will receive the exchanged assets"
        }
    );
    parser.addArgument(
        "asset_to_sell",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The ID of the Asset you want to sell."
        }
    );
    parser.addArgument(
        "asset_to_buy",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The ID of the Asset you want to buy"
        }
    );
    parser.addArgument(
        "buy_amount",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The amount of asset you want to buy"
        }
    );
}

function sellAssetConfig(parser) {
    parser.addArgument(
        "recipient",
        {
            nargs: `1`,
            type: String,
            action: 'store',
            help: "Who will receive the exchanged assets"
        }
    );
    parser.addArgument(
        "asset_to_sell",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The ID of the Asset you want to sell."
        }
    );
    parser.addArgument(
        "asset_to_buy",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The ID of the Asset you want to buy"
        }
    );
    parser.addArgument(
        "sell_amount",
        {
            nargs: `1`,
            type: Number,
            action: 'store',
            help: "The amount of asset you want to sell"
        }
    );
}

//Attestation module
function setClaimConfig(parser) {
    parser.addArgument(
        "holder",
        {
            nargs: `1`,
            type: String,
            action: 'store',
            help: "Who the claim is about"
        }
    );
    parser.addArgument(
        "topic",
        {
            nargs: `1`,
            type: String,
            action: 'store',
            help: "The topic of the claim"
        }
    );
    parser.addArgument(
        "value",
        {
            nargs: `1`,
            type: String,
            action: 'store',
            help: "The ID of the Asset you want to buy."
        }
    );
}

function removeClaimConfig(parser) {
    parser.addArgument(
        "holder",
        {
            nargs: `1`,
            type: String,
            action: 'store',
            help: "Who the claim is about"
        }
    );
    parser.addArgument(
        "topic",
        {
            nargs: `1`,
            type: String,
            action: 'store',
            help: "The topic of the claim"
        }
    );
}

function queryClaimConfig(parser) {
    parser.addArgument(
        "holder",
        {
            nargs: `1`,
            type: String,
            action: 'store',
            help: "Who the claim is about"
        }
    );
    parser.addArgument(
        "topic",
        {
            nargs: `1`,
            type: String,
            action: 'store',
            help: "The topic of the claim"
        }
    );
}

function constructParser() {
    let parser = ArgParse.ArgumentParser();

    // Add General help message that lists all supported command
    let subparser = parser.addSubparsers({dest: 'command', title:'Enter the command you want to call as arguments.\n' +
            'Supported Commands:\n' +
            'Generic Asset:\n' +
            'transfer <to> <amount> <asset_id> <sub>: Alice will transfer some money to <to>\n' +
            'balances <asset_id>: Check current balances for Alice and Bob\n\n' +

            'CENNZ X spot exchange \n' +
            'add_liquidity <asset_id> <asset_amount> <core_amount>: Add some liquidity into the exchange\'s reserve pool.\n' +
            'remove_liquidity <asset_id> <liquidity_amount> <min_asset_amount> <min_core_amount>: Withdraw some liquidity into trade and core asset.\n' +
            'liquidity_value <account_id> <asset_id>: Get the value of liquidity owned by <account_id> held in <asset_id>s exchange pool.\n' +
            'liquidity_price <asset_id> <liquidity_amount>: Get the cost to buy a certain amount of liquidity.\n\n' +

            'buy_price <asset_to_buy> <buy_amount> <asset_to_sell>: Query for the buy price for exchanging two assets.\n' +
            'sell_price <asset_to_sell> <sell_amount> <asset_to_guy>: Query for the sell price for exchanging two assets.\n' +
            'buy_asset <who> <asset_to_sell> <asset_to_buy> <buy_amount>: Buy some assets and deposit them into <who>\'s account. \n' +
            'sell_asset <who> <asset_to_sell> <asset_to_buy> <sell_amount>: Sell some assets and deposit exchanged assets into <who>\'s account. \n\n' +

            'Attestation \n' +
            'set_claim <holder> <topic> <value>: Add a new claim about someone on a topic.\n' +
            'remove_claim <holder> <topic>: Remove an existing claim about someone on a topic.\n' +
            `query_claim <holder> <topic>: Query for the value of a claim.\n`
    });

    // Add sub-parsers for each command
    // Generic Asset
    balancesConfig(subparser.addParser('balances',{addHelp: true,}));
    transferConfig(subparser.addParser('transfer',{addHelp: true,}));

    // Cennz X Spot exchange
    addLiquidityConfig(subparser.addParser('add_liquidity',{addHelp: true,}));
    removeLiquidityConfig(subparser.addParser('remove_liquidity',{addHelp: true,}));
    liquidityValueConfig(subparser.addParser('liquidity_value',{addHelp: true,}))
    liquidityPriceConfig(subparser.addParser('liquidity_price',{addHelp: true,}))

    buyPriceConfig(subparser.addParser('buy_price',{addHelp: true,}));
    sellPriceConfig(subparser.addParser('sell_price',{addHelp: true,}));
    buyAssetConfig(subparser.addParser('buy_asset',{addHelp: true,}));
    sellAssetConfig(subparser.addParser('sell_asset',{addHelp: true,}));

    // Attestation claim
    setClaimConfig(subparser.addParser('set_claim',{addHelp: true,}));
    removeClaimConfig(subparser.addParser('remove_claim',{addHelp: true,}));
    queryClaimConfig(subparser.addParser('query_claim',{addHelp: true,}));

    return parser;
}

function parseCli() {
    const parser = constructParser();
    return parser.parseArgs();
}

if (require.main === module) {
    settings = parseCli()
    console.log(settings)
} else {
    // Export modules for testing
    module.exports = {
        parseCli: parseCli
    }
}
