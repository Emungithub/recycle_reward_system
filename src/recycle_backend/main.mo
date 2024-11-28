import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft"; //create new NFTActorClass to call the nft.mo
import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import List "mo:base/List";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor Recycle{

    private type Listing = {
        itemOwner: Principal;
        itemPrice: Nat;
    };
    //One of the NFTs Hash Map
    var mapOfNFTS = HashMap.HashMap<Principal, NFTActorClass.NFT>(1, Principal.equal, Principal.hash);
    // the owner list of NFTS
    var mapOfOwners = HashMap.HashMap<Principal, List.List<Principal>>(1, Principal.equal, Principal.hash);
    //ermm marketplace listing for price 
    var mapOfListings = HashMap.HashMap<Principal, Listing>(1, Principal.equal, Principal.hash);

    //store the minted nfts (main backend)

    public shared(msg) func mint(imgData: [Nat8], name: Text) : async Principal{
        let owner : Principal = msg.caller;

        //add cycles for livedata
        Debug.print(debug_show(Cycles.balance()));
        Cycles.add(100_500_000_000);
        let newNFT = await NFTActorClass.NFT(name, owner, imgData);
        Debug.print(debug_show(Cycles.balance()));
        
        let newNTFPrincipal = await newNFT.getCanisterId();


        mapOfNFTS.put(newNTFPrincipal, newNFT);
        addToOwnershipMap(owner, newNTFPrincipal);

        return newNTFPrincipal;

    };

    private func addToOwnershipMap(owner: Principal, nftId: Principal){
        var ownedNFTs : List.List<Principal> = switch (mapOfOwners.get(owner)){
            case null List.nil<Principal>();
            case (?result) result;
        };

        ownedNFTs := List.push(nftId, ownedNFTs);
        mapOfOwners.put(owner, ownedNFTs);
    };

    public query func getOwnedNFTs(user: Principal) : async [Principal] {
        var userNFTs : List.List<Principal> = switch (mapOfOwners.get(user)){
            case null List.nil<Principal>();
            case (?result) result;
        };

        return List.toArray(userNFTs);

    };

    public shared(msg) func listItem(id: Principal, price: Nat) : async Text{
        var item : NFTActorClass.NFT = switch (mapOfNFTS.get(id)){
            case null return "NFT does not exist.";
            case (?result) result;
        };

        let owner = await item.getOwner();
        if (Principal.equal(owner, msg.caller)){
            let newListing : Listing = {
                itemOwner = owner;
                itemPrice = price;
            };
            //TODO:  can add timestamp, historical prices, loyalty price
            mapOfListings.put(id, newListing);
            return "Success";
        }else{
            return "You don't own the NFT"
        }
    };

    //Green marketplace listing
    public query func getListedNFTs() : async [Principal] {
        //keys return Iter (a motoko data type that return all the keys of the hashmap)
        let ids =  Iter.toArray(mapOfListings.keys()); //can turn keys to array using Iter
        return ids;
    };

    public query func getRecycleCanisterID(): async Principal {
        return Principal.fromActor(Recycle);
    };

    public query func isListed(id: Principal) : async Bool {
        if(mapOfListings.get(id) == null){
            return false;
        }else{
            return true;
        }
    };
    

    public query func getOriginalOwner(id: Principal) : async Principal{
        var listing : Listing = switch(mapOfListings.get(id)){
            case null return Principal.fromText("");
            case (?result) result;
        };
        return listing.itemOwner;
    };

    public query func getListedNFTPrice(id: Principal) : async Nat {
        var listing : Listing = switch(mapOfListings.get(id)){
            case null return 0;
            case (?result) result;
        };

        return listing.itemPrice;
    }


};
