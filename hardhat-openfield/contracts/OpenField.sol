pragma solidity ^0.8.4;

contract OpenField {
    string public name;
    mapping(uint256 => Farmer) public farmers;
    mapping(uint256 => Producer) public producers;
    mapping(uint256 => Distributor) public distributors;
    mapping(uint256 => Crop) public crops;

    mapping(uint256 => PesticideFarmer) public pesticidesFarmer;
    mapping(uint256 => Pesticide) public pesticides;
    mapping(uint256 => PesticideDistributor) public pesticidesDistributor;

    uint256 public farmerCount = 0;
    uint256 public producerCount = 0;
    uint256 public cropCount = 0;
    uint256 public pesticideFarmerCount = 0;
    uint256 public pesticideCount = 0;

    struct Farmer {
        uint256 id;
        string name;
        string location;
        string longitude;
        string latitude;
        string mobile;
    }
    struct Distributor {
        uint256 id;
        string name;
        string location;
        string longitude;
        string latitude;
    }
    struct Crop {
        uint256 id;
        uint256 farmer_id;
        string name;
    }
    struct PesticideFarmer {
        uint256 id;
        uint256 farmer_id;
        uint256 qtd;
        uint256 pesticide_id;
    }
    struct Pesticide {
        uint256 id;
        uint256 producer_id;
        string producer_name;
        string name;
        uint256 quantity;
        string ingredient;
        string batchno;
        string manufacture_date;
        string expiry_date;
    }

    struct PesticideDistributor {
        uint256 id;
        uint256 distributor_id;
        uint256 pesticide_id;
    }
    struct Producer {
        uint256 id;
        string name;
        string dealer_name;
        string location;
        string longitude;
        string latitude;
    }

    constructor() {
        name = "OpenField";

        producerCount += 1;
        Producer storage producer = producers[producerCount];
        producer.id = 1;
        producer.name = "Coroman Limited";
        producer.dealer_name = "akish";
        producer.location = "Bengluru";
        producer.longitude = "46%";
        producer.latitude = "36%";

        producerCount += 1;
        Producer storage producer1 = producers[producerCount];
        producer1.id = 2;
        producer1.name = "CHAK Limited";
        producer1.dealer_name = " amruh";
        producer1.location = "Andhra pradesh";
        producer1.longitude = "50%";
        producer1.latitude = "28%";

        addPesticide(
            1,
            90,
            "Ammonium nitrate",
            "Coroman Limited",
            "ammonium",
            "B001",
            "1/12/2002",
            "7/03/2003"
        );
        addPesticide(
            1,
            30,
            "Phosphurus",
            "Coroman Limited",
            "phosphurus",
            "B002",
            "16/12/2002",
            "7/03/2003"
        );
        addPesticide(
            1,
            40,
            "SuperPhosphurus",
            "Coroman Limited",
            "phosphurus",
            "B003",
            "6/12/2002",
            "8/07/2003"
        );

        addPesticide(
            2,
            80,
            "Rock phospahate",
            "CHAK Limited",
            "phosphate",
            "B009",
            "22/1/2002",
            "7/03/2003"
        );

        addPesticide(
            2,
            80,
            "Amonium chloride",
            "CHAK Limited",
            "Amonium",
            "B010",
            "19/1/2002",
            "7/09/2003"
        );

        // uint256 id;
        //         string name;
        //         string location;
        //         string longitude;
        //         string latitude;

        addFarmer("Sreehari", "7569845325", "kannur", "55%", "20%");
        addFarmer("Akash", "9776851245", "harikode", "45%", "23%");
        addFarmer("Alan", "7865339545", "etanthitta", "42%", "17%");
        addFarmer("Heya", "9446775558", "Andhra pradesh", "45%", "20%");

        addFarmer("Ashwin", "6779885481", "Chennai, TN", "45%", "50%");
        addFarmer("Asher", "74469883255", "Telangana", "45%", "10%");
        addFarmer("Nooha", "9665588442", "Hyderabad, AP", "45%", "30%");
    }

    event NewFarmer(Farmer);
    event NewPesticide(Pesticide);

    function addPesticide(
        uint256 _producer_id,
        uint256 _quantity,
        string memory _name,
        string memory _producer_name,
        string memory _ingredient,
        string memory _batchno,
        string memory _manufacture_date,
        string memory _expiry_date
    ) public {
        // require(bytes(_producer_id).length > 0);
        require(bytes(_name).length > 0);
        require(bytes(_producer_name).length > 0);
        require(bytes(_ingredient).length > 0);
        require(bytes(_batchno).length > 0);
        require(bytes(_manufacture_date).length > 0);
        require(bytes(_expiry_date).length > 0);

        pesticideCount++;

        Pesticide storage pesticide = pesticides[pesticideCount];

        pesticide.id = pesticideCount;
        pesticide.producer_id = _producer_id;
        pesticide.name = _name;
        pesticide.producer_name = _producer_name;
        pesticide.quantity = _quantity;
        pesticide.ingredient = _ingredient;
        pesticide.batchno = _batchno;
        pesticide.manufacture_date = _manufacture_date;
        pesticide.expiry_date = _expiry_date;

        emit NewPesticide(pesticide);
    }

    function addPesticideFarmer(
        uint256 _pest_id,
        uint256 _farmer_id,
        uint _qtd
    ) public {
        // require(bytes(_producer_id).length > 0);

        pesticideFarmerCount++;
        PesticideFarmer storage pesticide = pesticidesFarmer[
            pesticideFarmerCount
        ];
        pesticide.id = pesticideCount;
        pesticide.pesticide_id = _pest_id;
        pesticide.farmer_id = _farmer_id;
        pesticide.qtd = _qtd;

        // emit NewPesticide(pesticide);
    }

    function getFarmersPesticidesById(
        uint256 _id
    ) external view returns (Pesticide[] memory) {
        uint currentIndex = 0;
        uint count = 0;
        for (uint i = 0; i < pesticideCount; i++) {
            uint currentId = i + 1;
            PesticideFarmer storage currentItem = pesticidesFarmer[currentId];
            if (currentItem.farmer_id == _id) {
                count += 1;
            }
        }
        Pesticide[] memory _pesticides = new Pesticide[](count);
        for (uint i = 0; i < pesticideFarmerCount; i++) {
            uint currentId = i + 1;
            PesticideFarmer storage currentItem = pesticidesFarmer[currentId];
            if (currentItem.farmer_id == _id) {
                for (uint j = 0; j < pesticideCount; j++) {
                    Pesticide storage pest = pesticides[j + 1];
                    if (pest.id == currentItem.pesticide_id) {
                        Pesticide memory p;
                        p.id = pest.id;
                        p.producer_id = pest.producer_id;
                        p.name = pest.name;
                        p.producer_name = pest.producer_name;
                        p.quantity = currentItem.qtd;
                        p.ingredient = pest.ingredient;
                        p.batchno = pest.batchno;
                        p.manufacture_date = pest.manufacture_date;
                        p.expiry_date = pest.expiry_date;

                        // pest.quantity = currentItem.qtd;
                        _pesticides[currentIndex] = p;
                        currentIndex += 1;
                    }
                }
            }
        }
        return _pesticides;
    }

    function getProcudersPesticides(
        uint256 _id
    ) external view returns (Pesticide[] memory) {
        uint currentIndex = 0;
        uint count = 0;
        for (uint i = 0; i < pesticideCount; i++) {
            uint currentId = i + 1;
            Pesticide storage currentItem = pesticides[currentId];
            if (currentItem.producer_id == _id) {
                count += 1;
            }
        }
        Pesticide[] memory _pesticides = new Pesticide[](count);
        for (uint i = 0; i < pesticideCount; i++) {
            uint currentId = i + 1;
            Pesticide storage currentItem = pesticides[currentId];
            if (currentItem.producer_id == _id) {
                _pesticides[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return _pesticides;
    }

    function getPesticides() external view returns (Pesticide[] memory) {
        uint currentIndex = 0;
        Pesticide[] memory _pesticides = new Pesticide[](pesticideCount);
        for (uint i = 0; i < pesticideCount; i++) {
            uint currentId = i + 1;
            Pesticide storage currentItem = pesticides[currentId];

            _pesticides[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return _pesticides;
    }

    function getProducers() external view returns (Producer[] memory) {
        uint currentIndex = 0;
        Producer[] memory _producers = new Producer[](producerCount);
        for (uint i = 0; i < producerCount; i++) {
            uint currentId = i + 1;
            Producer storage currentItem = producers[currentId];
            _producers[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return _producers;
    }

    function addFarmer(
        string memory _name,
        string memory _mob,
        string memory _location,
        string memory _longitude,
        string memory _latitude
    ) public {
        require(bytes(_name).length > 0);
        require(bytes(_mob).length > 0);
        require(bytes(_location).length > 0);
        require(bytes(_longitude).length > 0);
        require(bytes(_latitude).length > 0);

        farmerCount++;

        Farmer storage newFarmer = farmers[farmerCount];

        newFarmer.id = farmerCount;
        newFarmer.name = _name;
        newFarmer.mobile = _mob;
        newFarmer.location = _location;
        newFarmer.longitude = _longitude;
        newFarmer.latitude = _latitude;

        emit NewFarmer(newFarmer);
    }

    function getFamerById(uint256 _id) external view returns (Farmer memory) {
        require(_id <= farmerCount);
        Farmer storage item = farmers[_id];
        return item;
    }

    function getProducerById(
        uint256 _id
    ) external view returns (Producer memory) {
        require(_id <= farmerCount);
        Producer storage item = producers[_id];
        return item;
    }

    function getAllFarmers() external view returns (Farmer[] memory) {
        uint currentIndex = 0;
        Farmer[] memory _farmers = new Farmer[](farmerCount);
        for (uint i = 0; i < farmerCount; i++) {
            uint currentId = i + 1;
            Farmer storage currentItem = farmers[currentId];
            _farmers[currentIndex] = currentItem;
            currentIndex += 1;
        }
        return _farmers;
    }
}
