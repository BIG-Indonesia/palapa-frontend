function open_metadata($id) {



  $.ajax({
    //url : "sumbawa.json",
    url: _cswURL + "?service=CSW&version=2.0.2&request=GetRecordById&ElementSetName=full&Id=" + $id + "&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/json",
    type: "GET",
    dataType: "JSON",
    success: function (data) {
      //Metadata
      try {
        $('#fileIdentifier').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:fileIdentifier"]["gco:CharacterString"]);
      } catch (err) {
        $('#fileIdentifier1').hide();
      }
      try {
        $('#language').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:language"]["gmd:LanguageCode"]["#text"]);
      } catch (err) {
        $('#language1').hide();
      }

      try {
        $('#characterSet').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:characterSet"]["gmd:MD_CharacterSetCode"]["#text"]);
      } catch (err) {
        $('#characterSet1').hide()
      }

      try {
        $('#hierarchyLevel').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:hierarchyLevel"]["gmd:MD_ScopeCode"]["#text"]);
      } catch (err) {
        $('#hierarchyLevel1').hide();
      }

      try {
        $('#metadataStandardName').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:metadataStandardName"]["gco:CharacterString"]);
      } catch (err) {
        $('#metadataStandardName1').hide();
      }

      try {
        $('#metadataStandardVersion').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:metadataStandardVersion"]["gco:CharacterString"]);
      } catch (err) {
        $('#metadataStandardVersion1').hide();
      }

      try {
        $('#datestamp').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:dateStamp"]["gco:DateTime"]);
      } catch (err) {
        $('#datestamp1').hide();
      }

      try {
        $('#dataSetURI').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:dataSetURI"]["gco:CharacterString"]);
      } catch (err) {
        $('#dataSetURI1').hide();
      }

      //Contac
      try {
        $('#individualName').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:individualName"]["gco:CharacterString"]);
      } catch (err) {
        $('#individualName1').hide();
      }

      try {
        $('#organisationName').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"]);
      } catch (err) {
        $('#organisationName1').hide();
      }

      try {
        $('#positionName').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:positionName"]["gco:CharacterString"]);
      } catch (err) {
        $('#positionName1').hide();
      }

      try {
        $('#phone').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:phone"]["gmd:CI_Telephone"]["gmd:voice"]["gco:CharacterString"]);
      } catch (err) {
        $('#phone1').hide();
      }

      try {
        $('#facsimile').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:phone"]["gmd:CI_Telephone"]["gmd:facsimile"]["gco:CharacterString"]);
      } catch (err) {
        $('#facsimile1').hide();
      }

      try {
        $('#deliveryPoint').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:deliveryPoint"]["gco:CharacterString"]);
      } catch (err) {
        $('#deliveryPoint1').hide();
      }

      try {
        $('#city').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:city"]["gco:CharacterString"]);
      } catch (err) {
        $('#city1').hide();
      }

      try {
        $('#postalCode').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:postalCode"]["gco:CharacterString"]);
      } catch (err) {
        $('#postalCode1').hide();
      }

      try {
        $('#country').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:country"]["gco:CharacterString"]);
      } catch (err) {
        $('#country1').hide();
      }

      try {
        $('#electronicMailAddress').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:electronicMailAddress"]["gco:CharacterString"]);
      } catch (err) {
        $('#electronicMailAddress1').hide();
      }


      try {
        $('#linkage').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:onlineResource"]["gmd:CI_OnlineResource"]["gmd:linkage"]["gmd:URL"]);
      } catch (err) {
        $('#linkage1').hide();
      }


      try {
        $('#protocol').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:onlineResource"]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]);
      } catch (err) {
        $('#protocol1').hide();
      }


      try {
        $('#function').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:onlineResource"]["gmd:CI_OnlineResource"]["gmd:function"]["gmd:CI_OnLineFunctionCode"]["#text"]);
      } catch (err) {
        $('#function1').hide();
      }


      try {
        $('#hoursOfService').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:hoursOfService"]["gco:CharacterString"]);
      } catch (err) {
        $('#hoursOfService1').hide();
      }

      try {
        $('#contactInstructions').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:contactInstructions"]["gco:CharacterString"]);
      } catch (err) {
        $('#contactInstructions1').hide();
      }


      try {
        $('#rolecontact').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:contact"]["gmd:CI_ResponsibleParty"]["gmd:role"]["gmd:CI_RoleCode"]["#text"]);
      } catch (err) {
        $('#rolecontact1').hide();
      }

      //SpatialRepresentationinfo

      try {
        $('#topologiLevel').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:spatialRepresentationInfo"]["gmd:MD_VectorSpatialRepresentation"]["gmd:topologyLevel"]["gmd:MD_TopologyLevelCode"]["#text"]);
      } catch (err) {
        $('#topologiLevel').hide();
      }


      try {
        $('#geometriObjects').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:spatialRepresentationInfo"]["gmd:MD_VectorSpatialRepresentation"]["gmd:geometricObjects"]["gmd:MD_GeometricObjects"]["gmd:geometricObjectType"]["gmd:MD_GeometricObjectTypeCode"]["#text"]);
      } catch (err) {
        $('#geometriObjects1').hide();
      }

      //  ReferenceSystemInfo
      try {
        $('#title_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:authority"]["gmd:CI_Citation"]["gmd:title"]["gco:CharacterString"]);
      } catch (err) {
        $('#title_refsystem1').hide();
      }

      try {
        $('#date_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:authority"]["gmd:CI_Citation"]["gmd:date"]["gmd:CI_Date"]["gmd:date"]["gco:Date"]);
      } catch (err) {
        $('#date_refsystem1').hide();
      }

      try {
        $('#dateType_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:authority"]["gmd:CI_Citation"]["gmd:date"]["gmd:CI_Date"]["gmd:dateType"]["gmd:CI_DateTypeCode"]["#text"]);
      } catch (err) {
        $('#dateType_refsystem1').hide();
      }


      try {
        $('#organisationName_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:authority"]["gmd:CI_Citation"]["gmd:citedResponsibleParty"]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"]);
      } catch (err) {
        $('#organisationName_refsystem1').hide();
      }

      try {
        $('#linkage_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:authority"]["gmd:CI_Citation"]["gmd:citedResponsibleParty"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:onlineResource"]["gmd:CI_OnlineResource"]["gmd:linkage"]["gmd:URL"]);
      } catch (err) {
        $('#linkage_refsystem1').hide();
      }


      try {
        $('#role_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:authority"]["gmd:CI_Citation"]["gmd:citedResponsibleParty"]["gmd:CI_ResponsibleParty"]["gmd:role"]["gmd:CI_RoleCode"]["#text"]);
      } catch (err) {
        $('#role_refsystem1').hide();
      }

      try {
        $('#code_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:code"]["gco:CharacterString"]);
      } catch (err) {
        $('#code_refsystem1').hide();
      }

      try {
        $('#version_refsystem').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:referenceSystemInfo"]["gmd:MD_ReferenceSystem"]["gmd:referenceSystemIdentifier"]["gmd:RS_Identifier"]["gmd:version"]["gco:CharacterString"]);
      } catch (err) {
        $('#version_refsystem1').hide();
      }




      //Identification Info

      try {
        $('#title_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:citation"]["gmd:CI_Citation"]["gmd:title"]["gco:CharacterString"]);
      } catch (err) {
        $('#title_identification1').hide();
      }

      try {
        $('#date_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:citation"]["gmd:CI_Citation"]["gmd:date"]["gmd:CI_Date"]["gmd:date"]["gco:DateTime"]);
      } catch (err) {
        $('#date_identification1').hide();
      }



      try {
        $('#dateType_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:citation"]["gmd:CI_Citation"]["gmd:date"]["gmd:CI_Date"]["gmd:dateType"]["gmd:CI_DateTypeCode"]["#text"]);
      } catch (err) {
        $('#date_identification1').hide();
      }


      try {
        $('#abstract_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:abstract"]["gco:CharacterString"]);
      } catch (err) {
        $('#abstract_identification1').hide();
      }

      // $('#status_identification').val(data);

      try {
        $('#resourceMaintenance_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:resourceMaintenance"]["gmd:MD_MaintenanceInformation"]["gmd:maintenanceAndUpdateFrequency"]["gmd:MD_MaintenanceFrequencyCode"]["#text"]);
      } catch (err) {
        $('#resourceMaintenance_identification1').hide();
      }

      try {
        $('#descriptiveKeywords_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:descriptiveKeywords"]["gmd:MD_Keywords"]["gmd:keyword"]["gmd:PT_FreeText"]["gmd:textGroup"]["gmd:LocalisedCharacterString"]["@locale"]);
      } catch (err) {
        $('#descriptiveKeywords_identification1').hide();
      }


      try {
        $('#resourceConstraints_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:resourceConstraints"]["gmd:MD_LegalConstraints"]["gmd:accessConstraints"]["gmd:MD_RestrictionCode"]["#text"]);
      } catch (err) {
        $('#resourceConstraints_identification1').hide();
      }


      try {
        $('#spatialRepresentationType_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:spatialRepresentationType"]["gmd:MD_SpatialRepresentationTypeCode"]["#text"]);
      } catch (err) {
        $('#spatialRepresentationType_identification1').hide();
      }


      try {
        $('#language_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:language"]["gmd:LanguageCode"]["#text"]);
      } catch (err) {
        $('#language_identification1').hide();
      }


      try {
        $('#CharacterSetCode_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:characterSet"]["gmd:MD_CharacterSetCode"]["#text"]);
      } catch (err) {
        $('#CharacterSetCode_identification1').hide();
      }


      try {
        $('#topicCategory_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:topicCategory"]["gmd:MD_TopicCategoryCode"]);
      } catch (err) {
        $('#topicCategory_identification1').hide();
      }


      try {
        $('#westBoundLongitude_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:extent"]["gmd:EX_Extent"]["gmd:geographicElement"]["gmd:EX_GeographicBoundingBox"]["gmd:westBoundLongitude"]["gco:Decimal"]);
      } catch (err) {
        $('#westBoundLongitude_identification1').hide();
      }


      try {
        $('#eastBoundLongitude_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:extent"]["gmd:EX_Extent"]["gmd:geographicElement"]["gmd:EX_GeographicBoundingBox"]["gmd:eastBoundLongitude"]["gco:Decimal"]);
      } catch (err) {
        $('#eastBoundLongitude_identification1').hide();
      }


      try {
        $('#southBoundLatitude_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:extent"]["gmd:EX_Extent"]["gmd:geographicElement"]["gmd:EX_GeographicBoundingBox"]["gmd:southBoundLatitude"]["gco:Decimal"]);
      } catch (err) {
        $('#southBoundLatitude_identification1').hide();
      }


      try {
        $('#northBoundLatitude_identification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:identificationInfo"]["gmd:MD_DataIdentification"]["gmd:extent"]["gmd:EX_Extent"]["gmd:geographicElement"]["gmd:EX_GeographicBoundingBox"]["gmd:northBoundLatitude"]["gco:Decimal"]);
      } catch (err) {
        $('#northBoundLatitude_identification1').hide();
      }

      //====================================================================================================================

      //distributionInfo
      //Distributor
      try {
        $('#Distributor_individualName').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["@id"]);
      } catch (err) {
        $('#Distributor_individualName1').hide();
      }


      try {
        $('#Distributor_organisationName').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:organisationName"]["gco:CharacterString"]);
      } catch (err) {
        $('#Distributor_organisationName1').hide();
      }

      try {
        $('#Distributor_positionName').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:positionName"]["gco:CharacterString"]);
      } catch (err) {
        $('#Distributor_positionName1').hide();
      }

      try {
        $('#Distributor_phone').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:phone"]["gmd:CI_Telephone"]["gmd:voice"]["gco:CharacterString"]);
      } catch (err) {
        $('#Distributor_phone1').hide();
      }

      try {
        $('#Distributor_facsimile').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:phone"]["gmd:CI_Telephone"]["gmd:facsimile"]["gco:CharacterString"]);
      } catch (err) {
        $('#Distributor_facsimile1').hide();
      }

      try {
        $('#Distributor_deliveryPoint').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:deliveryPoint"]["gco:CharacterString"]);
      } catch (err) {
        $('#Distributor_deliveryPoint').hide();
      }


      try {
        $('#Distributor_city').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:city"]["gco:CharacterString"]);
      } catch (err) {
        $('#Distributor_city1').hide();
      }


      try {
        $('#Distributor_postalCode').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:postalCode"]["gco:CharacterString"]);
      } catch (err) {
        $('#Distributor_postalCode').hide();
      }


      try {
        $('#Distributor_country').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:country"]["gco:CharacterString"]);
      } catch (err) {
        $('#Distributor_country1').hide();
      }

      try {
        $('#Distributor_electronicMailAddress').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:address"]["gmd:CI_Address"]["gmd:electronicMailAddress"]["gco:CharacterString"]);
      } catch (err) {
        $('#Distributor_electronicMailAddress1').hide();
      }


      try {
        $('#Distributor_linkage').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:onlineResource"]["gmd:CI_OnlineResource"]["gmd:linkage"]["gmd:URL"]);
      } catch (err) {
        $('#Distributor_linkage1').hide();
      }


      try {
        $('#Distributor_protocol').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:onlineResource"]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]);
      } catch (err) {
        $('#Distributor_protocol1').hide();
      }


      try {
        $('#Distributor_function').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:onlineResource"]["gmd:CI_OnlineResource"]["gmd:function"]["gmd:CI_OnLineFunctionCode"]["#text"]);
      } catch (err) {
        $$('#Distributor_function1').hide();
      }

      try {
        $('#Distributor_hoursOfService').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:hoursOfService"]["gco:CharacterString"]);
      } catch (err) {
        $('#Distributor_hoursOfService1').hide();
      }

      try {
        $('#Distributor_contactInstructions').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:contactInfo"]["gmd:CI_Contact"]["gmd:contactInstructions"]["gco:CharacterString"]);
      } catch (err) {
        $('#Distributor_contactInstructions1').hide();
      }



      try {
        $('#Distributor_role').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:distributor"]["gmd:MD_Distributor"]["gmd:distributorContact"]["gmd:CI_ResponsibleParty"]["gmd:role"]["gmd:CI_RoleCode"]["#text"]);
      } catch (err) {
        $('#Distributor_role1').hide();
      }


      //distributionInfo
      //Distributor
      //wms

      try {
        $('#wfs_linkage').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:linkage"]["gmd:URL"]);
      } catch (err) {
        $('#wfs_linkage1').hide();
      }

      try {
        $('#wfs_protocol').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]);
      } catch (err) {
        $('#wfs_protocol1').hide();
      }


      try {
        $('#wfs_name').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:name"]["gco:CharacterString"]);
      } catch (err) {
        $('#wfs_name1').hide();
      }

      try {
        $('#wfs_description').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:description"]["gco:CharacterString"]);
      } catch (err) {
        $('#wfs_description1').hide();
      }

      try {
        $('#wfs_function').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][0]["gmd:CI_OnlineResource"]["gmd:function"]["gmd:CI_OnLineFunctionCode"]["#text"]);
      } catch (err) {
        $('#wfs_function1').hide();
      }




      //===============================================================================


      //wms

      try {
        $('#wms_linkage').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][1]["gmd:CI_OnlineResource"]["gmd:linkage"]["gmd:URL"]);

      } catch (err) {
        $('#wms_linkage1').hide();
      }


      try {
        $('#wms_protocol').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][1]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]);
      } catch (err) {
        $('#wms_protocol1').hide();
      }


      try {
        $('#wms_name').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][1]["gmd:CI_OnlineResource"]["gmd:name"]["gco:CharacterString"]);
      } catch (err) {
        $('#wms_name1').hide();
      }

      try {
        $('#wms_description').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][1]["gmd:CI_OnlineResource"]["gmd:description"]["gco:CharacterString"]);
      } catch (err) {
        $('#wms_description1').hide();
      }


      try {
        $('#wms_function').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][1]["gmd:CI_OnlineResource"]["gmd:function"]["gmd:CI_OnLineFunctionCode"]["#text"]);

      } catch (err) {
        $('#wms_function1').hide();
      }


      //=============================================================================

      //zip
      try {
        $('#zip_linkage').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][2]["gmd:CI_OnlineResource"]["gmd:linkage"]["gmd:URL"]);
      } catch (err) {
        $('#zip_linkage1').hide();
      }

      try {
        $('#zip_protocol').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][2]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]);
      } catch (err) {
        $('#zip_protocol1').hide();
      }

      try {
        $('#zip_name').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][2]["gmd:CI_OnlineResource"]["gmd:name"]["gco:CharacterString"]);
      } catch (err) {
        $('#zip_name1').hide();
      }

      try {
        $('#zip_description').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][2]["gmd:CI_OnlineResource"]["gmd:description"]["gco:CharacterString"]);
      } catch (err) {
        $('#zip_description1').hide();
      }

      try {
        $('#zip_function').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][2]["gmd:CI_OnlineResource"]["gmd:function"]["gmd:CI_OnLineFunctionCode"]["#text"]);
      } catch (err) {
        $('#zip1_function').hide();
      }

      //==============================================================================



      //img
      try {
        $('#img_linkage').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][3]["gmd:CI_OnlineResource"]["gmd:linkage"]["gmd:URL"]);
      } catch (err) {
        $('#img_linkage1').hide();
      }

      try {
        $('#img_protocol').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][3]["gmd:CI_OnlineResource"]["gmd:protocol"]["gco:CharacterString"]);
      } catch (err) {
        $('#img_protocol1').hide();
      }


      try {
        $('#img_name').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][3]["gmd:CI_OnlineResource"]["gmd:name"]["gco:CharacterString"]);
      } catch (err) {
        $('#img_name1').hide();
      }

      try {
        $('#img_description').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][3]["gmd:CI_OnlineResource"]["gmd:description"]["gco:CharacterString"]);
      } catch (err) {
        $('#img_description1').hide();
      }


      try {
        $('#img_function').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:distributionInfo"]["gmd:MD_Distribution"]["gmd:transferOptions"]["gmd:MD_DigitalTransferOptions"]["gmd:onLine"][3]["gmd:CI_OnlineResource"]["gmd:function"]["gmd:CI_OnLineFunctionCode"]["#text"]);
      } catch (err) {
        $('#img_function1').hide();
      }

      //=======================================================









      //MetadataMaintenance

      try {
        $('#maintenanceAndUpdateFrequency').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:metadataMaintenance"]["gmd:MD_MaintenanceInformation"]["gmd:maintenanceAndUpdateFrequency"]["gmd:MD_MaintenanceFrequencyCode"]["#text"]);

      } catch (err) {

        $('#maintenanceAndUpdateFrequency1').hide();
      }

      try {
        $('#maintenanceNote').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:metadataMaintenance"]["gmd:MD_MaintenanceInformation"]["gmd:maintenanceNote"]["gco:CharacterString"]);
      } catch (err) {

        $('#maintenanceNote1').hide();
      }


      //MetadataConstrains
      try {
        $('#classification').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:metadataConstrains"]["gmd:MD_SecurityConstraints"]["gmd:classification"]["gmd:MD_ClassClassificationCode"]["@codeListValue"]);
      } catch (err) {
        $('#classification1').hide();
      }

      try {
        $('#usernote').val(data["csw:GetRecordByIdResponse"]["gmd:MD_Metadata"]["gmd:metadataConstraints"]["gmd:MD_SecurityConstraints"]["gmd:userNote"]["gco:CharacterString"]);
      } catch (err) {
        $('#usernote1').hide();
      }

      // ===================================================================================================================   


    },
    error: function (jqXHR, textStatus, errorThrown) {
      alert('Error get data from ajax');
    }
  });
}