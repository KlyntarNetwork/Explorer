export const SigHashes = {
    // ERC-20
    'a9059cbb' : 'transfer(address,uint256)',  // Transfer
    '095ea7b3' : 'approve(address,uint256)',  // Approve
    '23b872dd' : 'transferFrom(address,address,uint256)',  // TransferFrom
    '18160ddd' : 'totalSupply()',  // TotalSupply
    '70a08231' : 'balanceOf(address)',  // BalanceOf
    'dd62ed3e' : 'allowance(address,address)',  // Allowance
    
    // ERC-721
    '42842e0e' : 'safeTransferFrom(address,address,uint256)',  // SafeTransferFrom
    'b88d4fde' : 'safeTransferFrom(address,address,uint256,bytes)',  // SafeTransferFrom with data
    'a22cb465' : 'setApprovalForAll(address,bool)',  // SetApprovalForAll
    'e985e9c5' : 'getFinalized(uint256)',  // GetFinalized
    '081812fc' : 'isFinalizedForAll(address,address)',  // IsFinalizedForAll
    '6352211e' : 'ownerOf(uint256)',  // OwnerOf
    
    // ERC-1155
    'f242432a' : 'safeTransferFrom(address,address,uint256,uint256,bytes)',  // SafeTransferFrom (ERC-1155)
    '2eb2c2d6' : 'safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)',  // SafeBatchTransferFrom
    '00fdd58e' : 'balanceOfBatch(address[],uint256[])',  // BalanceOfBatch
    'd9b67a26' : 'uri(uint256)',  // URI for ERC-1155
    
    // AccessControl
    '79cc6790' : 'hasRole(bytes32,address)',  // HasRole
    'd547741f' : 'grantRole(bytes32,address)',  // GrantRole
    '36568abe' : 'revokeRole(bytes32,address)',  // RevokeRole
    '2f2ff15d' : 'renounceRole(bytes32,address)',  // RenounceRole
    
    // ERC-777
    '9bd9bbc6' : 'send(address,uint256,bytes)',  // Send (ERC-777)
    '42966c68' : 'operatorSend(address,address,uint256,bytes,bytes)',  // OperatorSend
    '013cf08b' : 'authorizeOperator(address)',  // AuthorizeOperator
    '556f0dc6' : 'revokeOperator(address)',  // RevokeOperator

    // Ownable
    '8da5cb5b' : 'owner()',  // Owner
    'f2fde38b' : 'transferOwnership(address)',  // TransferOwnership
    '715018a6' : 'renounceOwnership()',  // RenounceOwnership

    // Miscellaneous
    '6d4ce63c' : 'mint(address,uint256)',  // Mint
    '40c10f19' : 'mint(address,uint256)',  // Mint with amount
    '9dc29fac' : 'burnFrom(address,uint256)',  // BurnFrom
    'c87b56dd' : 'withdraw(uint256)',  // Withdraw
    'd0e30db0' : 'deposit()',  // Deposit

    // Multisig
    'f00d4b5d' : 'submitTransaction(address,uint256,bytes)',  // SubmitTransaction (Gnosis Multisig)
    '882164d0' : 'confirmTransaction(uint256)',  // ConfirmTransaction
    'bc7d0150' : 'executeTransaction(uint256)',  // ExecuteTransaction

    // DeFi specific
    '6ea056a9' : 'unstake(uint256)',  // Unstake
    'e9fad8ee' : 'claimRewards()',  // ClaimRewards

    // Voting
    '19e3b533' : 'delegate(address)',  // Delegate
    '5c19a95c' : 'castVote(uint256,bool)',  // CastVote
    '4c19a95c' : 'vote(uint256,bool)',  // Vote
    
    // EIP-2612 Permit (for gasless approvals)
    'd505accf' : 'permit(address,address,uint256,uint256,uint8,bytes32,bytes32)',  // Permit
} as const;
